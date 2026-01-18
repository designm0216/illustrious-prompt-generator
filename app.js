// ==========================================
// モバイルデバイス検出（画面ブレ防止の核心）
// ==========================================
const IS_MOBILE = window.innerWidth <= 1200 || 
                  'ontouchstart' in window || 
                  navigator.maxTouchPoints > 0 ||
                  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

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

let currentWeightTarget = {
    tag: null,
    stateKey: null,
    charIndex: null,
    setValue: null
};

// 現在表示中のタグ
let currentPreviewTag = null;

// ==========================================
// タグビジュアル管理システム
// ==========================================

const TagVisualManager = {
    storage: {},
    
    init() {
        this.loadFromStorage();
        this.setupEventListeners();
    },
    
    loadFromStorage() {
        const saved = localStorage.getItem('tag_visuals');
        if (saved) {
            try {
                this.storage = JSON.parse(saved);
            } catch (e) {
                console.warn('タグビジュアルデータの読み込みに失敗:', e);
                this.storage = {};
            }
        }
    },
    
    saveToStorage() {
        try {
            localStorage.setItem('tag_visuals', JSON.stringify(this.storage));
            return true;
        } catch (e) {
            console.error('保存エラー:', e);
            if (e.name === 'QuotaExceededError') {
                alert('⚠️ 保存容量が不足しています！\n\n画像ファイルは容量を大量消費します。\n「URL登録」を推奨します。');
            } else {
                alert('保存に失敗しました: ' + e.message);
            }
            return false;
        }
    },
    
    getImageUrl(tag) {
        if (this.storage[tag.id]) {
            return this.storage[tag.id];
        }
        
        if (tag.image) {
            return tag.image;
        }
        
        const conventionPath = `./images/tags/${tag.id}.webp`;
        return conventionPath;
    },
    
    setImage(tagId, imageUrl) {
        if (imageUrl) {
            this.storage[tagId] = imageUrl;
        } else {
            delete this.storage[tagId];
        }
        return this.saveToStorage();
    },
    
    setupEventListeners() {
        // 編集ボタン
        const editBtn = document.getElementById('edit-visual-btn');
        if (editBtn) {
            editBtn.onclick = () => {
                if (currentPreviewTag) {
                    openImageEditModal(currentPreviewTag);
                } else {
                    alert('タグを選択してから編集ボタンを押してください');
                }
            };
        }
        
        // 閉じるボタン
        const closeBtn = document.getElementById('close-preview-btn');
        if (closeBtn) {
            closeBtn.onclick = () => hideVisualPreview();
        }
        
        // モーダル内のボタン制御
        setTimeout(() => {
            const saveBtn = document.getElementById('modal-save-btn');
            if (saveBtn) saveBtn.onclick = saveTagImage;
            
            const deleteBtn = document.getElementById('delete-image-btn');
            if (deleteBtn) deleteBtn.onclick = deleteTagImage;
            
            const cancelBtn = document.getElementById('modal-cancel-btn');
            if (cancelBtn) cancelBtn.onclick = closeImageModal;
            
            const modalCloseBtn = document.getElementById('modal-close-btn');
            if (modalCloseBtn) modalCloseBtn.onclick = closeImageModal;
            
            const backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) backdrop.onclick = closeImageModal;
        }, 100);
        
        // タブ切り替え
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                switchTab(btn.dataset.tab);
            });
        });
        
        // ファイル選択
        const fileInput = document.getElementById('image-file-input');
        if (fileInput) {
            fileInput.addEventListener('change', handleFileSelect);
        }
        
        // URL入力
        const urlInput = document.getElementById('image-url-input');
        if (urlInput) {
            urlInput.addEventListener('input', updateModalPreview);
        }
    }
};

// ==========================================
// ビジュアルプレビュー機能
// ==========================================

function showVisualPreview(tag, isPermanent = false) {
    // ★ モバイルでは画面ブレ防止のため完全にスキップ
    if (IS_MOBILE) return;
    
    currentPreviewTag = tag;
    
    const panel = document.getElementById('visual-preview-panel');
    const content = document.getElementById('preview-content');
    const info = document.getElementById('preview-info');
    const tagName = document.getElementById('preview-tag-name');
    const tagValue = document.getElementById('preview-tag-value');
    
    if (!panel || !content || !info) return;
    
    tagName.textContent = tag.label;
    tagValue.textContent = tag.value;
    info.style.display = 'block';
    
    const imageUrl = TagVisualManager.getImageUrl(tag);
    
    // ローディング表示
    content.innerHTML = `
        <div class="preview-placeholder">
            <div class="placeholder-icon">⏳</div>
            <p>読み込み中...</p>
        </div>
    `;
    
    const img = new Image();
    
    img.onload = () => {
        content.innerHTML = `<img src="${imageUrl}" alt="${tag.label}" class="preview-image">`;
        panel.classList.add('show-image');
    };
    
    img.onerror = () => {
        content.innerHTML = `
            <div class="preview-placeholder">
                <div class="placeholder-icon">📷</div>
                <p><strong>${tag.label}</strong><br>
                <span style="font-size:0.8em; color:var(--text-secondary);">画像未登録</span></p>
                <button class="preset-btn" onclick="openImageEditModal(currentPreviewTag)" style="margin-top: 8px;">
                    ✏️ 画像を追加
                </button>
            </div>
        `;
        panel.classList.remove('show-image');
    };
    
    img.src = imageUrl;
    panel.style.display = 'block';
    
    if (!isPermanent) {
        setTimeout(() => {
            if (currentPreviewTag === tag) {
                hideVisualPreview();
            }
        }, 3000);
    }
}

function hideVisualPreview() {
    const panel = document.getElementById('visual-preview-panel');
    const content = document.getElementById('preview-content');
    const info = document.getElementById('preview-info');
    
    if (!panel || !content || !info) return;
    
    content.innerHTML = `
        <div class="preview-placeholder">
            <div class="placeholder-icon">🖼️</div>
            <p>タグにマウスを合わせると<br>ビジュアルが表示されます</p>
        </div>
    `;
    
    info.style.display = 'none';
    panel.classList.remove('show-image');
    currentPreviewTag = null;
}

// ==========================================
// 画像編集モーダル機能
// ==========================================

function openImageEditModal(tag) {
    const modal = document.getElementById('image-edit-modal');
    const tagName = document.getElementById('modal-tag-name');
    const urlInput = document.getElementById('image-url-input');
    const fileInput = document.getElementById('image-file-input');
    const deleteBtn = document.getElementById('delete-image-btn');
    
    if (!modal) return;
    
    tagName.textContent = tag.label;
    
    const currentUrl = TagVisualManager.storage[tag.id] || '';
    urlInput.value = currentUrl;
    
    deleteBtn.style.display = currentUrl ? 'block' : 'none';
    
    fileInput.value = '';
    
    updateModalPreview();
    
    modal.style.display = 'flex';
}

function closeImageModal() {
    const modal = document.getElementById('image-edit-modal');
    if (modal) modal.style.display = 'none';
}

function switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabName);
    });
    
    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.toggle('active', panel.id === `${tabName}-tab`);
    });
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    if (file.size > 2 * 1024 * 1024) {
        alert('⚠️ ファイルサイズが大きすぎます（2MB以下にしてください）');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
        document.getElementById('image-url-input').value = e.target.result;
        updateModalPreview();
    };
    reader.readAsDataURL(file);
}

function updateModalPreview() {
    const url = document.getElementById('image-url-input').value;
    const preview = document.getElementById('modal-preview');
    const img = document.getElementById('modal-preview-img');
    
    if (!preview || !img) return;
    
    if (url) {
        img.src = url;
        preview.style.display = 'block';
    } else {
        preview.style.display = 'none';
    }
}

function isValidImageInput(input) {
    if (input.startsWith('data:image/')) return true;
    if (input.startsWith('http://') || input.startsWith('https://')) return true;
    if (input.startsWith('./') || input.startsWith('../')) return true;
    const imageExts = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    return imageExts.some(ext => input.toLowerCase().includes(ext));
}

function saveTagImage() {
    const urlInput = document.getElementById('image-url-input');
    if (!urlInput) {
        alert('❌ 入力欄が見つかりません');
        return;
    }
    
    const url = urlInput.value.trim();
    
    if (!currentPreviewTag) {
        alert('❌ タグが選択されていません');
        return;
    }
    
    if (url && !isValidImageInput(url)) {
        if (!confirm('⚠️ 画像URLの形式が正しくない可能性があります。\n保存を続行しますか？')) {
            return;
        }
    }
    
    const success = TagVisualManager.setImage(currentPreviewTag.id, url);
    
    if (success) {
        closeImageModal();
        
        if (url) {
            showVisualPreview(currentPreviewTag, true);
            alert('✅ 画像を保存しました！');
        } else {
            hideVisualPreview();
            alert('✅ 画像を削除しました');
        }
    }
}

function deleteTagImage() {
    if (!currentPreviewTag) return;
    
    if (confirm(`「${currentPreviewTag.label}」の画像を削除しますか？`)) {
        TagVisualManager.setImage(currentPreviewTag.id, null);
        closeImageModal();
        hideVisualPreview();
        alert('✅ 画像を削除しました');
    }
}

// ==========================================
// 初期化処理
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
    updateOutput();
});

function initializeApp() {
    renderTags('quality-tags', PROMPT_DATABASE.quality, 'global');
    renderTags('style-tags', PROMPT_DATABASE.style, 'global');
    renderTags('rating-tags', PROMPT_DATABASE.rating, 'global');
    renderTags('count-tags', PROMPT_DATABASE.count, 'global');
    renderTags('interaction-tags', PROMPT_DATABASE.interaction, 'global');
    
    renderCharacters();
    
    // 基本カテゴリのレンダリング
    const basicCategories = [
        { id: 'emotions-tags', data: PROMPT_DATABASE.emotions },
        { id: 'actions-tags', data: PROMPT_DATABASE.actions },
        { id: 'props-tags', data: PROMPT_DATABASE.props },
        { id: 'fantasy-tags', data: PROMPT_DATABASE.fantasy },
        { id: 'body-features-tags', data: PROMPT_DATABASE.body_features },
        { id: 'environment-tags', data: PROMPT_DATABASE.environment },
        { id: 'visual-effects-tags', data: PROMPT_DATABASE.visual_effects },
        { id: 'sound-effects-tags', data: PROMPT_DATABASE.sound_effects },
        { id: 'hand-details-tags', data: PROMPT_DATABASE.hand_details },
        { id: 'daily-life-tags', data: PROMPT_DATABASE.daily_life }
    ];

    basicCategories.forEach(cat => {
        if (cat.data) renderTags(cat.id, cat.data, 'global');
    });
    
    renderTags('camera-tags', PROMPT_DATABASE.camera, 'camera');
    renderTags('background-tags', PROMPT_DATABASE.background, 'background');
    renderTags('lighting-tags', PROMPT_DATABASE.lighting, 'lighting');
    
    // NSFW関連カテゴリのレンダリング
    const nsfwCategories = [
        { id: 'sexual-positions-tags', data: PROMPT_DATABASE.sexual_positions },
        { id: 'sex-acts-tags', data: PROMPT_DATABASE.sex_acts },
        { id: 'cum-tags', data: PROMPT_DATABASE.cum },
        { id: 'bondage-tags', data: PROMPT_DATABASE.bondage },
        { id: 'nsfw-context-tags', data: PROMPT_DATABASE.nsfw_context },
        { id: 'nsfw-masturbation-tags', data: PROMPT_DATABASE.nsfw_masturbation },
        { id: 'nsfw-toys-tags', data: PROMPT_DATABASE.nsfw_toys },
        { id: 'nsfw-fluids-tags', data: PROMPT_DATABASE.nsfw_fluids },
        { id: 'nsfw-advanced-tags', data: PROMPT_DATABASE.nsfw_advanced },
        { id: 'foreplay-tags', data: PROMPT_DATABASE.foreplay },
        { id: 'bodily-fluids-tags', data: PROMPT_DATABASE.bodily_fluids },
        { id: 'yuri-acts-tags', data: PROMPT_DATABASE.yuri_acts },
        { id: 'yaoi-acts-tags', data: PROMPT_DATABASE.yaoi_acts },
        { id: 'physiology-tags', data: PROMPT_DATABASE.physiology },
        { id: 'clothing-disarray-tags', data: PROMPT_DATABASE.clothing_disarray },
          { id: 'undressing-tags', data: PROMPT_DATABASE.undressing }, 
        { id: 'erotic-camera-tags', data: PROMPT_DATABASE.erotic_camera },
        { id: 'intense-expressions-tags', data: PROMPT_DATABASE.intense_expressions },
        { id: 'aftermath-tags', data: PROMPT_DATABASE.aftermath }
    ];

    nsfwCategories.forEach(cat => {
        if (cat.data) renderTags(cat.id, cat.data, 'global');
    });
    
    const negativeEl = document.getElementById('negative-output');
    if (negativeEl) negativeEl.value = PROMPT_DATABASE.negative.base;
    
    // ビジュアル機能の初期化（PC版のみ）
    if (!IS_MOBILE && typeof TagVisualManager !== 'undefined' && document.getElementById('visual-preview-panel')) {
        TagVisualManager.init();
    }

    updateTranslationDisplay();
}

function setupEventListeners() {
    const addCharBtn = document.getElementById('add-character');
    if (addCharBtn) {
        addCharBtn.addEventListener('click', () => {
            appState.characters.push(createNewCharacter());
            renderCharacters();
            updateOutput();
        });
    }

    const segmentCheckbox = document.getElementById('segment-mode');
    if (segmentCheckbox) {
        segmentCheckbox.addEventListener('change', (e) => {
            appState.segmentMode = e.target.checked;
            updateOutput();
        });
    }

    const clearBtn = document.getElementById('clear-all');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (confirm('全ての選択をクリアしますか？')) clearAllSelections();
        });
    }

    setupPresetListeners();
}

function renderTags(containerId, tags, stateKey) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    tags.forEach(tag => {
        const btn = document.createElement('button');
        btn.className = 'tag-btn';
        if (tag.nsfw) btn.classList.add('nsfw');

        const isSelected = appState[stateKey] && appState[stateKey].has(tag.value);
        if (isSelected) btn.classList.add('selected');

        const weight = tag.weight;
        btn.textContent = (weight && weight !== 1.0) ? `${tag.label} (${weight.toFixed(1)})` : tag.label;

        // ★ PC版のみホバー表示を有効化
        if (!IS_MOBILE) {
            btn.addEventListener('mouseenter', () => {
                showVisualPreview(tag, false);
            });
            
            btn.addEventListener('mouseleave', () => {
                if (!btn.classList.contains('selected')) {
                    setTimeout(() => {
                        if (currentPreviewTag === tag && !btn.classList.contains('selected')) {
                            hideVisualPreview();
                        }
                    }, 500);
                }
            });
        }

        // ★ クリック/タップイベント（モバイル最適化）
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            toggleTag(tag, stateKey, btn);
            
            // ★ モバイルでは画面ブレの原因となるパネル表示をスキップ
            if (!IS_MOBILE) {
                showVisualPreview(tag, true);
                
                if (btn.classList.contains('selected')) {
                    showWeightPanel(tag, stateKey);
                } else {
                    hideWeightPanel();
                    if (currentPreviewTag === tag) {
                        hideVisualPreview();
                    }
                }
            }
        });

        container.appendChild(btn);
    });
}

function renderCharacters() {
    const wrapper = document.getElementById('characters-wrapper');
    if (!wrapper) return;
    wrapper.innerHTML = '';

    appState.characters.forEach((character, index) => {
        const charDiv = document.createElement('div');
        charDiv.className = 'character-block';

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

        const categoryOrder = [
            { key: 'hair_color', label: '髪の色:' },
            { key: 'hair_length', label: '髪の長さ:' },
            { key: 'hair_style', label: '髪型:' },
            { key: 'eyes', label: '目の色:' },
            { key: 'eye_shape', label: '目の形状・状態:' },
            { key: 'eye_details', label: '瞳の詳細・まつげ:' },
            { key: 'eyebrows', label: '眉毛:' },
           { key: 'lips', label: '唇・口元:' },
            { key: 'breasts', label: '胸・バスト:' },
            { key: 'nipples', label: '乳首詳細:' },
            { key: 'clothing_color', label: '衣装の色:' },
            { key: 'clothing', label: '服装:' },
            { key: 'pose', label: 'ポーズ・表情:' }
        ];

        categoryOrder.forEach(cat => {
            if (PROMPT_DATABASE.character[cat.key]) {
                appendCharacterSection(charDiv, cat.label, PROMPT_DATABASE.character[cat.key], character[cat.key], index);
            }
        });

        if (PROMPT_DATABASE.male_features) {
            const maleDivider = document.createElement('div');
            maleDivider.className = 'male-section-header';
            maleDivider.innerHTML = '<h5 class="male-section-title">♂ 男性キャラクター専用設定</h5>';
            charDiv.appendChild(maleDivider);

            const mf = PROMPT_DATABASE.male_features;
            if (mf.body_type) appendCharacterSection(charDiv, '【男性】体型・筋肉:', mf.body_type, character.male_body_type, index);
            if (mf.facial_features) appendCharacterSection(charDiv, '【男性】顔の特徴・髭:', mf.facial_features, character.male_facial, index);
            if (mf.age_type) appendCharacterSection(charDiv, '【男性】年齢・タイプ:', mf.age_type, character.male_age_type, index);
            if (mf.male_clothing) appendCharacterSection(charDiv, '【男性】服装:', mf.male_clothing, character.male_clothing, index);
            if (mf.body_hair) appendCharacterSection(charDiv, '【男性】体毛:', mf.body_hair, character.male_body_hair, index);
            if (mf.genitalia) appendCharacterSection(charDiv, '【男性】性器詳細:', mf.genitalia, character.male_genitalia, index);
            if (mf.male_poses) appendCharacterSection(charDiv, '【男性】ポーズ・態度:', mf.male_poses, character.male_poses, index);
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
        btn.textContent = (weight && weight !== 1.0) ? `${tag.label} (${weight.toFixed(1)})` : tag.label;

        // ★ PC版のみホバー表示
        if (!IS_MOBILE) {
            btn.addEventListener('mouseenter', () => {
                showVisualPreview(tag, false);
            });
            
            btn.addEventListener('mouseleave', () => {
                if (!btn.classList.contains('selected')) {
                    setTimeout(() => {
                        if (currentPreviewTag === tag && !btn.classList.contains('selected')) {
                            hideVisualPreview();
                        }
                    }, 500);
                }
            });
        }

        // ★ クリック/タップイベント（モバイル最適化）
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            toggleCharacterTag(tag, targetSet, charIndex);
            
            // ★ モバイルではパネル表示をスキップ
            if (!IS_MOBILE) {
                showVisualPreview(tag, true);
                
                if (targetSet.has(tag.value)) {
                    showWeightPanel(tag, null, charIndex);
                } else {
                    hideWeightPanel();
                    if (currentPreviewTag === tag) {
                        hideVisualPreview();
                    }
                }
            }
        });

        tagContainer.appendChild(btn);
    });

    sectionDiv.appendChild(tagContainer);
    parent.appendChild(sectionDiv);
}

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
    }

    if (targetSet.has(tag.value)) {
        targetSet.delete(tag.value);
    } else {
        targetSet.add(tag.value);
    }

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
        'body-features-tags': PROMPT_DATABASE.body_features,
        'environment-tags': PROMPT_DATABASE.environment,
        'visual-effects-tags': PROMPT_DATABASE.visual_effects,
        'hand-details-tags': PROMPT_DATABASE.hand_details,
        'camera-tags': PROMPT_DATABASE.camera,
        'background-tags': PROMPT_DATABASE.background,
        'lighting-tags': PROMPT_DATABASE.lighting,
        'sexual-positions-tags': PROMPT_DATABASE.sexual_positions,
        'foreplay-tags': PROMPT_DATABASE.foreplay,
        'bodily-fluids-tags': PROMPT_DATABASE.bodily_fluids,
        'yuri-acts-tags': PROMPT_DATABASE.yuri_acts,
        'yaoi-acts-tags': PROMPT_DATABASE.yaoi_acts,
        'sex-acts-tags': PROMPT_DATABASE.sex_acts,
        'cum-tags': PROMPT_DATABASE.cum,
        'bondage-tags': PROMPT_DATABASE.bondage,
        'nsfw-context-tags': PROMPT_DATABASE.nsfw_context,
        'nsfw-masturbation-tags': PROMPT_DATABASE.nsfw_masturbation,
        'nsfw-toys-tags': PROMPT_DATABASE.nsfw_toys,
        'nsfw-fluids-tags': PROMPT_DATABASE.nsfw_fluids,
        'nsfw-advanced-tags': PROMPT_DATABASE.nsfw_advanced,
        'physiology-tags': PROMPT_DATABASE.physiology,
        'clothing-disarray-tags': PROMPT_DATABASE.clothing_disarray,
        'erotic-camera-tags': PROMPT_DATABASE.erotic_camera,
        'intense-expressions-tags': PROMPT_DATABASE.intense_expressions,
        'aftermath-tags': PROMPT_DATABASE.aftermath,
        'daily-life-tags': PROMPT_DATABASE.daily_life,
    };
    return map[id];
}

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
    // ★ モバイルでは画面ブレ防止のため完全にスキップ
    if (IS_MOBILE) return;
    
    const panel = document.getElementById('weight-panel');
    const nameSpan = document.getElementById('current-tag-name');
    const input = document.getElementById('weight-input');

    if (!panel || !nameSpan || !input) return;

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
            if (charIndex !== null) {
                renderCharacters();
            } else {
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
    const panel = document.getElementById('weight-panel');
    if (panel) panel.style.display = 'none';
    currentWeightTarget.tag = null;
}

function adjustWeight(delta) {
    if (!currentWeightTarget.tag) return;
    const input = document.getElementById('weight-input');
    if (!input) return;
    const currentValue = parseFloat(input.value);
    const newWeight = Math.max(0.1, Math.min(3.0, currentValue + delta));
    setWeight(newWeight);
}

function setWeight(value) {
    if (!currentWeightTarget.tag) return;
    const input = document.getElementById('weight-input');
    if (!input) return;
    const weight = parseFloat(value);
    input.value = weight.toFixed(1);
    currentWeightTarget.setValue(weight);
}

function updateWeight() {
    const input = document.getElementById('weight-input');
    if (!input) return;
    const value = input.value;
    setWeight(value);
}

// ==========================================
// プロンプト生成・出力更新（[]括弧対応版）
// ==========================================

function updateOutput() {
    const segments = [];

    // 1. グローバルタグ（品質・スタイル・レーティング）
    if (appState.global.size > 0) {
        const globalTags = Array.from(appState.global).map(getWeightedValue);
        segments.push(globalTags.join(', '));
    }

    // 2. キャラクター（BREAK区切り）
    appState.characters.forEach((character) => {
        const charTags = [];
        
        // Crody推奨順序でタグを出力
        const order = [
            'hair_color', 'hair_length', 'hair_style',
            'eyes', 'eye_shape', 'eye_details', 'eyebrows','lips',
            'breasts', 'nipples', 'clothing_color', 'clothing', 'pose',
            'male_body_type', 'male_facial', 'male_age_type',
            'male_clothing', 'male_body_hair', 'male_genitalia', 'male_poses'
        ];
        
        order.forEach(key => {
            if (character[key] && character[key].size > 0) {
                const tags = Array.from(character[key]).map(getWeightedValue);
                charTags.push(...tags);
            }
        });
        
        if (charTags.length > 0) {
            segments.push(charTags.join(', '));
        }
    });

    // 3. カメラ・背景・照明
    const environmentTags = [
        ...Array.from(appState.camera),
        ...Array.from(appState.background),
        ...Array.from(appState.lighting)
    ].map(getWeightedValue);
    
    if (environmentTags.length > 0) {
        segments.push(environmentTags.join(', '));
    }

    // 4. ★ セグメントモードに応じた出力形式（[]括弧対応）
    let output;
    if (appState.segmentMode) {
        // セグメントモードON: 各セグメントを[]で囲み、BREAKで区切る
        const wrappedSegments = segments.map(seg => `[${seg}]`);
        output = wrappedSegments.join('\nBREAK\n');
    } else {
        // セグメントモードOFF: 通常のカンマ区切り（括弧なし）
        output = segments.join(', ');
    }

    // 5. テキストエリアに出力
    const positiveOutput = document.getElementById('positive-output');
    if (positiveOutput) {
        positiveOutput.value = output;
    }

    // 6. 関連機能の更新
    updateNegativePrompt();
    updateTranslationDisplay();
}

function updateNegativePrompt() {
    let negative = PROMPT_DATABASE.negative.base;
    
    const hasNSFWRating = Array.from(appState.global).some(tag => 
        tag.includes('questionable') || tag.includes('explicit')
    );
    
    const hasNSFWTags = Array.from(appState.global).some(tag => {
        const tagObj = findTagByValue(tag);
        return tagObj && tagObj.nsfw;
    });
    
    const hasCharacterNSFW = appState.characters.some(char => 
        Object.values(char).some(set => 
            Array.from(set).some(tag => {
                const tagObj = findTagByValue(tag);
                return tagObj && tagObj.nsfw;
            })
        )
    );

    if (!hasNSFWRating && !hasNSFWTags && !hasCharacterNSFW) {
        negative += ', ' + PROMPT_DATABASE.negative.nsfw_safe;
    }
    
    const negativeEl = document.getElementById('negative-output');
    if (negativeEl) negativeEl.value = negative;
}

let tagTranslationMap = null;

function buildTagTranslationMap() {
    if (tagTranslationMap) return tagTranslationMap;
    tagTranslationMap = new Map();
    
    const scanDatabase = (obj) => {
        Object.values(obj).forEach(item => {
            if (Array.isArray(item)) {
                item.forEach(tag => {
                    if (tag && tag.value && tag.label) {
                        tagTranslationMap.set(tag.value, tag.label);
                    }
                });
            } else if (item && typeof item === 'object' && !item.id) {
                scanDatabase(item);
            }
        });
    };
    
    scanDatabase(PROMPT_DATABASE);
    return tagTranslationMap;
}

function translateTag(englishTag) {
    const map = buildTagTranslationMap();
    
    const weightMatch = englishTag.match(/^\((.+?):([\d.]+)\)$/);
    if (weightMatch) {
        const baseTag = weightMatch[1];
        const weight = weightMatch[2];
        const japanese = map.get(baseTag) || baseTag;
        return { text: japanese, weight: weight, hasWeight: true };
    }
    
    const japanese = map.get(englishTag) || englishTag;
    return { text: japanese, weight: null, hasWeight: false };
}

function updateTranslationDisplay() {
    const container = document.querySelector('.translation-content');
    if (!container) return;
    
    const sections = [];

    if (appState.global.size > 0) {
        const globalTags = Array.from(appState.global).map(translateTag);
        if (globalTags.length > 0) {
            sections.push({
                title: '品質・スタイル・シチュエーション',
                tags: globalTags,
                icon: '⭐'
            });
        }
    }

    appState.characters.forEach((character, index) => {
        const charTags = [];
        const order = [
            'hair_color', 'hair_length', 'hair_style',
            'eyes', 'eye_shape', 'eye_details', 'eyebrows','lips',
            'breasts', 'nipples','clothing_color', 'clothing', 'pose',
            'male_body_type', 'male_facial', 'male_age_type',
            'male_clothing', 'male_body_hair', 'male_genitalia', 'male_poses'
        ];
        
        order.forEach(key => {
            if (character[key] && character[key].size > 0) {
                const tags = Array.from(character[key]).map(translateTag);
                charTags.push(...tags);
            }
        });
        
        if (charTags.length > 0) {
            sections.push({
                title: `キャラクター ${index + 1}`,
                tags: charTags,
                icon: '👤'
            });
        }
    });

    const cameraBgTags = [
        ...Array.from(appState.camera),
        ...Array.from(appState.background)
    ].map(translateTag);
    
    if (cameraBgTags.length > 0) {
        sections.push({
            title: 'カメラ・背景',
            tags: cameraBgTags,
            icon: '📷'
        });
    }

    if (appState.lighting.size > 0) {
        const lightingTags = Array.from(appState.lighting).map(translateTag);
        sections.push({
            title: '照明・仕上げ',
            tags: lightingTags,
            icon: '💡'
        });
    }

    if (sections.length === 0) {
        container.innerHTML = '<p class="placeholder-text">タグを選択すると、ここに日本語で内容が表示されます...</p>';
        return;
    }

    const html = sections.map(section => `
        <div class="translation-section">
            <div class="section-header">
                <span class="section-icon">${section.icon}</span>
                <span class="section-title">${section.title}</span>
                <span class="tag-count">(${section.tags.length})</span>
            </div>
            <div class="tag-list">
                ${section.tags.map(tag => `
                    <span class="translation-tag ${tag.hasWeight ? 'weighted' : ''}">
                        ${tag.text}${tag.hasWeight ? `<span class="weight-indicator">${tag.weight}</span>` : ''}
                    </span>
                `).join('')}
            </div>
        </div>
    `).join('');
    
    container.innerHTML = html;
}

function toggleTranslationArea() {
    const display = document.getElementById('translation-display');
    if (!display) return;
    if (display.style.display === 'none') {
        display.style.display = 'block';
    } else {
        display.style.display = 'none';
    }
}

function findTagByValue(value) {
    const searchInObject = (obj, results = []) => {
        Object.values(obj).forEach(val => {
            if (Array.isArray(val)) {
                results.push(...val);
            } else if (val && typeof val === 'object' && !val.id) {
                searchInObject(val, results);
            }
        });
        return results;
    };
    
    const allTags = searchInObject(PROMPT_DATABASE);
    return allTags.find(tag => tag && tag.value === value);
}

function clearAllSelections() {
    appState.global.clear();
    appState.characters = [createNewCharacter()];
    appState.camera.clear();
    appState.background.clear();
    appState.lighting.clear();
    initializeApp();
    updateOutput();
}

function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;
    element.select();
    document.execCommand('copy');
    
    const btn = event.target;
    if (!btn) return;
    const originalText = btn.textContent;
    btn.textContent = '✓ コピー完了';
    btn.style.background = 'var(--accent-green)';
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
    }, 2000);
}

function setupPresetListeners() {
    const saveBtn = document.getElementById('save-preset');
    const loadBtn = document.getElementById('load-preset');
    const deleteBtn = document.getElementById('delete-preset');

    if (saveBtn) saveBtn.addEventListener('click', savePreset);
    if (loadBtn) loadBtn.addEventListener('click', loadPreset);
    if (deleteBtn) deleteBtn.addEventListener('click', deletePreset);
    loadPresetList();
}

function savePreset() {
    const nameInput = document.getElementById('preset-name');
    if (!nameInput) return;
    const name = nameInput.value.trim();
    if (!name) return alert('プリセット名を入力してください');
    
    const presetData = {
        global: Array.from(appState.global),
        characters: appState.characters.map(char => {
            const charData = {};
            Object.keys(char).forEach(key => {
                charData[key] = Array.from(char[key]);
            });
            return charData;
        }),
        camera: Array.from(appState.camera),
        background: Array.from(appState.background),
        lighting: Array.from(appState.lighting)
    };
    
    localStorage.setItem(`preset_${name}`, JSON.stringify(presetData));
    loadPresetList();
    alert('保存しました');
}

function loadPreset() {
    const select = document.getElementById('preset-list');
    if (!select) return;
    const name = select.value;
    if (!name) return;
    
    const raw = localStorage.getItem(`preset_${name}`);
    if (!raw) return;
    const data = JSON.parse(raw);
    
    appState.global = new Set(data.global);
    appState.characters = data.characters.map(char => {
        const newChar = {};
        Object.keys(char).forEach(key => {
            newChar[key] = new Set(char[key]);
        });
        return newChar;
    });
    appState.camera = new Set(data.camera);
    appState.background = new Set(data.background);
    appState.lighting = new Set(data.lighting);
    
    initializeApp();
    updateOutput();
    alert('読み込みました');
}

function deletePreset() {
    const select = document.getElementById('preset-list');
    if (!select) return;
    const name = select.value;
    if (!name) return;
    
    if (confirm('削除しますか？')) {
        localStorage.removeItem(`preset_${name}`);
        loadPresetList();
    }
}

function loadPresetList() {
    const select = document.getElementById('preset-list');
    if (!select) return;

    select.innerHTML = '<option value="">プリセットを選択...</option>';
    
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('preset_')) {
            const name = key.replace('preset_', '');
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            select.appendChild(option);
        }
    }
}





