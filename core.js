// ==========================================
// js/shared/core.js - 共通ロジック
// ==========================================

// モバイル検出（既存コード）
const IS_MOBILE = window.innerWidth <= 1200 || 
                  'ontouchstart' in window || 
                  navigator.maxTouchPoints > 0 ||
                  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// ★ グローバル状態：StateSyncManagerから復元
let savedState = StateSyncManager.load();
let appState = savedState || {
    global: new Set(),
    characters: [createNewCharacter()],
    camera: new Set(),
    background: new Set(),
    lighting: new Set(),
    segmentMode: true
};

function createNewCharacter() {
    return {
        hair_color: new Set(),
        hair_length: new Set(),
        hair_style: new Set(),
        eyes: new Set(),
        eye_shape: new Set(),
        eye_details: new Set(),
        eyebrows: new Set(),
        lips: new Set(),
        breasts: new Set(),
        nipples: new Set(),
        clothing_color: new Set(),
        clothing: new Set(),
        pose: new Set(),
        male_body_type: new Set(),
        male_facial: new Set(),
        male_age_type: new Set(),
        male_clothing: new Set(),
        male_body_hair: new Set(),
        male_genitalia: new Set(),
        male_poses: new Set()
    };
}

// ★ 状態変更時の自動保存
function syncState() {
    StateSyncManager.autoSave(appState);
}

// ★ ページ判定による初期化
function initializePageSpecificContent() {
    const path = window.location.pathname;
    const page = path.split("/").pop() || "index.html";

    console.log(`🎯 ページ初期化: ${page}`);

    // 共通部分は必ず初期化
    initializeCommonSections();

    // ページ固有の初期化
    switch(page) {
        case 'general.html':
            initializeGeneralPage();
            break;
        case 'nsfw.html':
            initializeNSFWPage();
            break;
        case 'manga.html':
            initializeMangaPage();
            break;
        default:
            console.log('デフォルトページとして処理');
    }

    updateOutput();
    updateTranslationDisplay();
}

// 共通セクションの初期化
function initializeCommonSections() {
    // 品質・スタイル（全ページ共通）
    if (document.getElementById('quality-tags')) {
        renderTags('quality-tags', DATABASE_CORE.quality, 'global');
    }
    if (document.getElementById('style-tags')) {
        renderTags('style-tags', DATABASE_CORE.style, 'global');
    }
    if (document.getElementById('rating-tags')) {
        renderTags('rating-tags', DATABASE_CORE.rating, 'global');
    }

    // キャラクター（全ページ共通）
    renderCharacters();

    // カメラ・背景・照明（全ページ共通）
    if (document.getElementById('camera-tags')) {
        renderTags('camera-tags', DATABASE_CORE.camera, 'camera');
    }
    if (document.getElementById('background-tags')) {
        renderTags('background-tags', DATABASE_CORE.background, 'background');
    }
    if (document.getElementById('lighting-tags')) {
        renderTags('lighting-tags', DATABASE_CORE.lighting, 'lighting');
    }

    // ネガティブプロンプト初期値
    const negativeEl = document.getElementById('negative-output');
    if (negativeEl) {
        negativeEl.value = DATABASE_CORE.negative.base;
    }

    // ビジュアル機能（PC版のみ）
    if (!IS_MOBILE && document.getElementById('visual-preview-panel')) {
        TagVisualManager.init();
    }
}

// ページ固有の初期化関数
function initializeGeneralPage() {
    console.log('📚 日常描写ページを初期化中...');
    if (typeof DATABASE_GENERAL !== 'undefined') {
        renderTags('daily-life-tags', DATABASE_GENERAL.daily_life, 'global');
        renderTags('emotions-tags', DATABASE_GENERAL.emotions, 'global');
        renderTags('props-tags', DATABASE_GENERAL.props, 'global');
        renderTags('school-work-tags', DATABASE_GENERAL.school_work, 'global');
    }
}

function initializeNSFWPage() {
    console.log('🔞 NSFW専用ページを初期化中...');
    if (typeof DATABASE_NSFW !== 'undefined') {
        const nsfwCategories = [
            'physiology-tags', 'clothing-disarray-tags', 'undressing-tags',
            'sexual-positions-tags', 'sex-acts-tags', 'foreplay-tags',
            'cum-tags', 'bodily-fluids-tags', 'yuri-acts-tags', 'yaoi-acts-tags',
            'bondage-tags', 'nsfw-toys-tags', 'nsfw-masturbation-tags',
            'nsfw-context-tags', 'erotic-camera-tags', 'intense-expressions-tags',
            'aftermath-tags', 'nsfw-advanced-tags'
        ];

        nsfwCategories.forEach(containerId => {
            const key = containerId.replace('-tags', '');
            if (DATABASE_NSFW[key]) {
                renderTags(containerId, DATABASE_NSFW[key], 'global');
            }
        });
    }
}

function initializeMangaPage() {
    console.log('🎨 漫画制作ページを初期化中...');
    if (typeof DATABASE_MANGA !== 'undefined') {
        renderTags('manga-format-tags', DATABASE_MANGA.format, 'global');
        renderTags('manga-panels-tags', DATABASE_MANGA.panels, 'global');
        renderTags('manga-speech-tags', DATABASE_MANGA.speech, 'global');
        renderTags('manga-effects-tags', DATABASE_MANGA.effects, 'global');
        renderTags('manga-symbols-tags', DATABASE_MANGA.symbols, 'global');
        renderTags('manga-tones-tags', DATABASE_MANGA.tones, 'global');
        
        // 音響効果（既存データを流用）
        if (DATABASE_CORE.sound_effects) {
            renderTags('sound-effects-tags', DATABASE_CORE.sound_effects, 'global');
        }
    }
}

// ★ タグ切り替え時に自動保存を追加
function toggleTag(tag, stateKey, btnElement) {
    const targetSet = appState[stateKey];

    if (tag.exclusive) {
        for (const value of targetSet) {
            const existingTag = findTagByValue(value);
            if (existingTag && existingTag.exclusive === tag.exclusive && existingTag.id !== tag.id) {
                targetSet.delete(value);
            }
        }
        const containerId = btnElement.parentElement.parentElement.id;
        setTimeout(() => {
            const tags = findTagsByContainerId(containerId);
            if (tags) renderTags(containerId, tags, stateKey);
        }, 0);
    }

    if (targetSet.has(tag.value)) {
        targetSet.delete(tag.value);
        btnElement.classList.remove('selected');
    } else {
        targetSet.add(tag.value);
        btnElement.classList.add('selected');
    }

    updateOutput();
    syncState(); // ★ 自動保存
}

// 既存の関数群（renderTags, renderCharacters, updateOutput等）はそのまま使用
// ... [既存のコードをここに配置] ...

// DOM読み込み完了時の初期化
document.addEventListener('DOMContentLoaded', () => {
    initializePageSpecificContent();
    setupEventListeners();
});

// グローバルに公開
window.IllustCore = {
    appState,
    initializePageSpecificContent,
    syncState,
    updateOutput,
    renderTags,
    renderCharacters,
    setupEventListeners
};
