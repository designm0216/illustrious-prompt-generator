// ==========================================
// グローバル状態管理
// ==========================================
let appState = {
    global: new Set(),
    characters: [createNewCharacter()],
    camera: new Set(),
    background: new Set(),
    lighting: new Set(),
    segmentMode: true
};

function createNewCharacter() {
    return {
        // 既存の女性・汎用タグ
        hair_color: new Set(),
        hair_length: new Set(),
        hair_style: new Set(),
        eyes: new Set(),
        eye_shape: new Set(),
        eye_details: new Set(),
        eyebrows: new Set(),
        breasts: new Set(),
        nipples: new Set(),
        clothing: new Set(),
        pose: new Set(),

        // ★ 男性用タグを追加（自動BREAK対応）
        male_body_type: new Set(),
        male_facial: new Set(),
        male_age_type: new Set(),
        male_clothing: new Set(),
        male_body_hair: new Set(),
        male_genitalia: new Set(),
        male_poses: new Set()
    };
}

// 現在編集中の重み情報
let currentWeightTarget = {
    tag: null,
    stateKey: null,
    charIndex: null,
    setValue: null
};

// ==========================================
// 初期化処理
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
    updateOutput();
});

function initializeApp() {
    // セクション1
    renderTags('quality-tags', PROMPT_DATABASE.quality, 'global');
    renderTags('style-tags', PROMPT_DATABASE.style, 'global');
    renderTags('rating-tags', PROMPT_DATABASE.rating, 'global');

    // セクション2
    renderTags('count-tags', PROMPT_DATABASE.count, 'global');
    renderTags('interaction-tags', PROMPT_DATABASE.interaction, 'global');

    // セクション3
    renderCharacters();

    // セクション3.5 Phase 1 (Danbooru)
    if (PROMPT_DATABASE.emotions) renderTags('emotions-tags', PROMPT_DATABASE.emotions, 'global');
    if (PROMPT_DATABASE.actions) renderTags('actions-tags', PROMPT_DATABASE.actions, 'global');
    if (PROMPT_DATABASE.props) renderTags('props-tags', PROMPT_DATABASE.props, 'global');
    if (PROMPT_DATABASE.fantasy) renderTags('fantasy-tags', PROMPT_DATABASE.fantasy, 'global');

    // Phase 2.0 拡張タグ
    if (PROMPT_DATABASE.body_features) renderTags('body-features-tags', PROMPT_DATABASE.body_features, 'global');
    if (PROMPT_DATABASE.environment) renderTags('environment-tags', PROMPT_DATABASE.environment, 'global');
    if (PROMPT_DATABASE.visual_effects) renderTags('visual-effects-tags', PROMPT_DATABASE.visual_effects, 'global');
    if (PROMPT_DATABASE.hand_details) renderTags('hand-details-tags', PROMPT_DATABASE.hand_details, 'global');

    // セクション4
    renderTags('camera-tags', PROMPT_DATABASE.camera, 'camera');
    renderTags('background-tags', PROMPT_DATABASE.background, 'background');

    // セクション5
    renderTags('lighting-tags', PROMPT_DATABASE.lighting, 'lighting');

    // NSFWセクション
    if (PROMPT_DATABASE.sexual_positions) renderTags('sexual-positions-tags', PROMPT_DATABASE.sexual_positions, 'global');
    if (PROMPT_DATABASE.sex_acts) renderTags('sex-acts-tags', PROMPT_DATABASE.sex_acts, 'global');
    if (PROMPT_DATABASE.cum) renderTags('cum-tags', PROMPT_DATABASE.cum, 'global');
    if (PROMPT_DATABASE.bondage) renderTags('bondage-tags', PROMPT_DATABASE.bondage, 'global');

    // ★ Phase 1 NSFW拡張 ここから追加
    if (PROMPT_DATABASE.nsfw_context) renderTags('nsfw-context-tags', PROMPT_DATABASE.nsfw_context, 'global');
    if (PROMPT_DATABASE.nsfw_masturbation) renderTags('nsfw-masturbation-tags', PROMPT_DATABASE.nsfw_masturbation, 'global');
    if (PROMPT_DATABASE.nsfw_toys) renderTags('nsfw-toys-tags', PROMPT_DATABASE.nsfw_toys, 'global');
    if (PROMPT_DATABASE.nsfw_fluids) renderTags('nsfw-fluids-tags', PROMPT_DATABASE.nsfw_fluids, 'global');
    if (PROMPT_DATABASE.nsfw_advanced) renderTags('nsfw-advanced-tags', PROMPT_DATABASE.nsfw_advanced, 'global');
    // ★ Phase 1 NSFW拡張 ここまで追加

    document.getElementById('negative-output').value = PROMPT_DATABASE.negative.base;
    updateTranslationDisplay();
}

// ==========================================
// イベントリスナー
// ==========================================
function setupEventListeners() {
    document.getElementById('add-character').addEventListener('click', () => {
        appState.characters.push(createNewCharacter());
        renderCharacters();
        updateOutput();
    });

    document.getElementById('segment-mode').addEventListener('change', (e) => {
        appState.segmentMode = e.target.checked;
        updateOutput();
    });

    document.getElementById('clear-all').addEventListener('click', () => {
        if (confirm('全ての選択をクリアしますか？')) clearAllSelections();
    });

    setupPresetListeners();
}

// ==========================================
// レンダリング関数
// ==========================================
function renderTags(containerId, tags, stateKey) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    tags.forEach(tag => {
        const tagWrapper = document.createElement('div');

        const btn = document.createElement('button');
        btn.className = 'tag-btn';
        if (tag.nsfw) btn.classList.add('nsfw');

        const isSelected = appState[stateKey] && appState[stateKey].has(tag.value);
        if (isSelected) btn.classList.add('selected');

        // 重み表示
        const weight = tag.weight;
        if (weight && weight !== 1.0) {
            btn.textContent = `${tag.label} (${weight.toFixed(1)})`;
        } else {
            btn.textContent = tag.label;
        }

        // クリックイベント
        btn.onclick = () => {
            toggleTag(tag, stateKey, btn);
            if (btn.classList.contains('selected')) {
                showWeightPanel(tag, stateKey);
            } else {
                hideWeightPanel();
            }
        };

        tagWrapper.appendChild(btn);
        container.appendChild(tagWrapper);
    });
}

function renderCharacters() {
    const wrapper = document.getElementById('characters-wrapper');
    wrapper.innerHTML = '';

    appState.characters.forEach((character, index) => {
        const charDiv = document.createElement('div');
        charDiv.className = 'character-block';

        // ヘッダー部分
        const header = document.createElement('div');
        header.className = 'character-header';

        const title = document.createElement('h4');
        title.className = 'character-title';
        title.textContent = `キャラクター ${index + 1}`;
        header.appendChild(title);

        if (appState.characters.length > 1) {
            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-character';
            removeBtn.textContent = '✕ 削除';
            removeBtn.onclick = () => {
                appState.characters.splice(index, 1);
                renderCharacters();
                updateOutput();
            };
            header.appendChild(removeBtn);
        }

        charDiv.appendChild(header);

        // 既存の女性・汎用カテゴリ
        const categoryOrder = [
            { key: 'hair_color', label: '髪の色:' },
            { key: 'hair_length', label: '髪の長さ:' },
            { key: 'hair_style', label: '髪型:' },
            { key: 'eyes', label: '目の色:' },
            { key: 'eye_shape', label: '目の形状・状態:' },
            { key: 'eye_details', label: '瞳の詳細・まつげ:' },
            { key: 'eyebrows', label: '眉毛:' },
            { key: 'breasts', label: '胸・バスト:' },
            { key: 'nipples', label: '乳首詳細:' },
            { key: 'clothing', label: '服装:' },
            { key: 'pose', label: 'ポーズ・表情:' }
        ];

        categoryOrder.forEach(cat => {
            if (PROMPT_DATABASE.character[cat.key]) {
                appendCharacterSection(
                    charDiv,
                    cat.label,
                    PROMPT_DATABASE.character[cat.key],
                    character[cat.key],
                    index
                );
            }
        });

        // ★ 男性専用セクションをキャラクターブロック内に追加
        if (PROMPT_DATABASE.male_features) {
            // 視認性向上：男性セクションの区切り線
            const maleDivider = document.createElement('div');
            maleDivider.className = 'male-section-header';
            maleDivider.innerHTML = '<h5 class="male-section-title">♂ 男性キャラクター専用設定</h5>';
            charDiv.appendChild(maleDivider);

            const mf = PROMPT_DATABASE.male_features;

            if (mf.body_type) {
                appendCharacterSection(
                    charDiv,
                    '【男性】体型・筋肉:',
                    mf.body_type,
                    character.male_body_type,
                    index
                );
            }

            if (mf.facial_features) {
                appendCharacterSection(
                    charDiv,
                    '【男性】顔の特徴・髭:',
                    mf.facial_features,
                    character.male_facial,
                    index
                );
            }

            if (mf.age_type) {
                appendCharacterSection(
                    charDiv,
                    '【男性】年齢・タイプ:',
                    mf.age_type,
                    character.male_age_type,
                    index
                );
            }

            if (mf.male_clothing) {
                appendCharacterSection(
                    charDiv,
                    '【男性】服装:',
                    mf.male_clothing,
                    character.male_clothing,
                    index
                );
            }

            if (mf.body_hair) {
                appendCharacterSection(
                    charDiv,
                    '【男性】体毛:',
                    mf.body_hair,
                    character.male_body_hair,
                    index
                );
            }

            if (mf.genitalia) {
                appendCharacterSection(
                    charDiv,
                    '【男性】性器詳細:',
                    mf.genitalia,
                    character.male_genitalia,
                    index
                );
            }

            if (mf.male_poses) {
                appendCharacterSection(
                    charDiv,
                    '【男性】ポーズ・態度:',
                    mf.male_poses,
                    character.male_poses,
                    index
                );
            }
        }

        wrapper.appendChild(charDiv);
    });
}

function appendCharacterSection(parent, title, tags, targetSet, charIndex) {
    const sectionDiv = document.createElement('div');
    sectionDiv.className = 'subsection';

    const titleElement = document.createElement('h5');
    titleElement.textContent = title;
    titleElement.style.color = 'var(--text-secondary)';
    titleElement.style.fontSize = '0.9rem';
    titleElement.style.marginBottom = '8px';
    sectionDiv.appendChild(titleElement);

    const tagContainer = document.createElement('div');
    tagContainer.className = 'tag-container';

    tags.forEach(tag => {
        const btn = document.createElement('button');
        btn.className = 'tag-btn';
        if (tag.nsfw) btn.classList.add('nsfw');

        const isSelected = targetSet.has(tag.value);
        if (isSelected) btn.classList.add('selected');

        const weight = tag.weight;
        if (weight && weight !== 1.0) {
            btn.textContent = `${tag.label} (${weight.toFixed(1)})`;
        } else {
            btn.textContent = tag.label;
        }

        btn.onclick = () => {
            toggleCharacterTag(tag, targetSet, charIndex);
            if (targetSet.has(tag.value)) {
                showWeightPanel(tag, null, charIndex);
            } else {
                hideWeightPanel();
            }
        };

        tagContainer.appendChild(btn);
    });

    sectionDiv.appendChild(tagContainer);
    parent.appendChild(sectionDiv);
}

// ==========================================
// タグ切り替えロジック
// ==========================================
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
}

function toggleCharacterTag(tag, targetSet, charIndex) {
    if (tag.exclusive) {
        for (const value of targetSet) {
            const existingTag = findTagByValue(value);
            if (existingTag && existingTag.exclusive === tag.exclusive && existingTag.id !== tag.id) {
                targetSet.delete(value);
            }
        }
        if (targetSet.has(tag.value)) targetSet.delete(tag.value);
        else targetSet.add(tag.value);

        renderCharacters();
        updateOutput();
        return;
    }

    if (targetSet.has(tag.value)) targetSet.delete(tag.value);
    else targetSet.add(tag.value);

    renderCharacters();
    updateOutput();
}

function findTagsByContainerId(id) {
    const map = {
        'quality-tags': PROMPT_DATABASE.quality,
        'style-tags': PROMPT_DATABASE.style,
        'rating-tags': PROMPT_DATABASE.rating,
        'count-tags': PROMPT_DATABASE.count,
        'interaction-tags': PROMPT_DATABASE.interaction,
        'emotions-tags': PROMPT_DATABASE.emotions,
        'actions-tags': PROMPT_DATABASE.actions,
        'props-tags': PROMPT_DATABASE.props,
        'fantasy-tags': PROMPT_DATABASE.fantasy,
        'camera-tags': PROMPT_DATABASE.camera,
        'background-tags': PROMPT_DATABASE.background,
        'lighting-tags': PROMPT_DATABASE.lighting,
        'sexual-positions-tags': PROMPT_DATABASE.sexual_positions,
        'sex-acts-tags': PROMPT_DATABASE.sex_acts,
        'cum-tags': PROMPT_DATABASE.cum,
        'bondage-tags': PROMPT_DATABASE.bondage,

        // ★ Phase 1 NSFW拡張 ここから追加
        'nsfw-context-tags': PROMPT_DATABASE.nsfw_context,
        'nsfw-masturbation-tags': PROMPT_DATABASE.nsfw_masturbation,
        'nsfw-toys-tags': PROMPT_DATABASE.nsfw_toys,
        'nsfw-fluids-tags': PROMPT_DATABASE.nsfw_fluids,
        'nsfw-advanced-tags': PROMPT_DATABASE.nsfw_advanced
        // ★ Phase 1 NSFW拡張 ここまで追加
    };
    return map[id];
}

// ==========================================
// 重み調整ロジック
// ==========================================
function applyWeight(value, tagObj) {
    const weight = tagObj?.weight;
    if (weight && weight !== 1.0) {
        return `(${value}:${weight.toFixed(1)})`;
    }
    return value;
}

function getWeightedValue(tagValue) {
    const tagObj = findTagByValue(tagValue);
    return applyWeight(tagValue, tagObj);
}

function showWeightPanel(tag, stateKey, charIndex = null) {
    const panel = document.getElementById('weight-panel');
    const nameSpan = document.getElementById('current-tag-name');
    const input = document.getElementById('weight-input');

    const currentWeight = tag.weight || 1.0;

    panel.style.display = 'block';
    nameSpan.textContent = tag.label;
    input.value = currentWeight.toFixed(1);

    currentWeightTarget = {
        tag: tag,
        stateKey: stateKey,
        charIndex: charIndex,
        setValue: (newWeight) => {
            tag.weight = newWeight;
            updateOutput();
            if (charIndex !== null) renderCharacters();
            else {
                const containerId = findContainerIdByTag(tag);
                if (containerId) renderTags(containerId, findTagsByContainerId(containerId), stateKey);
            }
        }
    };
}

function findContainerIdByTag(tag) {
    if (PROMPT_DATABASE.quality.includes(tag)) return 'quality-tags';
    if (PROMPT_DATABASE.style.includes(tag)) return 'style-tags';
    return null;
}

function hideWeightPanel() {
    document.getElementById('weight-panel').style.display = 'none';
    currentWeightTarget.tag = null;
}

function adjustWeight(delta) {
    if (!currentWeightTarget.tag) return;
    const currentValue = parseFloat(document.getElementById('weight-input').value);
    const newWeight = Math.max(0.1, Math.min(3.0, currentValue + delta));
    setWeight(newWeight);
}

function setWeight(value) {
    if (!currentWeightTarget.tag) return;
    const weight = parseFloat(value);
    document.getElementById('weight-input').value = weight.toFixed(1);
    currentWeightTarget.setValue(weight);
}

function updateWeight() {
    const value = document.getElementById('weight-input').value;
    setWeight(value);
}

// ==========================================
// プロンプト生成
// ==========================================
function updateOutput() {
    const segments = [];

    // グローバルタグ（品質・スタイルなど）
    if (appState.global.size > 0) {
        const weightedGlobal = Array.from(appState.global).map(getWeightedValue);
        segments.push(weightedGlobal.join(', '));
    }

    // キャラクターごとのタグ（BREAK区切り）
    const characterSegments = [];
    appState.characters.forEach(character => {
        const allCharacterTags = [];
        const order = [
            'hair_color', 'hair_length', 'hair_style',
            'eyes', 'eye_shape', 'eye_details', 'eyebrows',
            'breasts', 'nipples',
            'clothing',
            'pose',

            // ★ 男性用もキャラブロックに含める
            'male_body_type',
            'male_facial',
            'male_age_type',
            'male_clothing',
            'male_body_hair',
            'male_genitalia',
            'male_poses'
        ];
        order.forEach(key => {
            if (character[key] && character[key].size > 0) {
                const weightedTags = Array.from(character[key]).map(getWeightedValue);
                allCharacterTags.push(...weightedTags);
            }
        });
        if (allCharacterTags.length > 0) characterSegments.push(allCharacterTags.join(', '));
    });

    if (characterSegments.length > 0) {
        segments.push(characterSegments.join(' BREAK '));
    }

    // カメラ・背景
    const cameraBackground = [
        ...Array.from(appState.camera).map(getWeightedValue),
        ...Array.from(appState.background).map(getWeightedValue)
    ].filter(Boolean);

    if (cameraBackground.length > 0) {
        segments.push(cameraBackground.join(', '));
    }

    // ライティング
    if (
