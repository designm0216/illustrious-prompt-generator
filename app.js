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
        breasts: new Set(),
        nipples: new Set(),
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
    
    if (PROMPT_DATABASE.emotions) renderTags('emotions-tags', PROMPT_DATABASE.emotions, 'global');
    if (PROMPT_DATABASE.actions) renderTags('actions-tags', PROMPT_DATABASE.actions, 'global');
    if (PROMPT_DATABASE.props) renderTags('props-tags', PROMPT_DATABASE.props, 'global');
    if (PROMPT_DATABASE.fantasy) renderTags('fantasy-tags', PROMPT_DATABASE.fantasy, 'global');
    if (PROMPT_DATABASE.body_features) renderTags('body-features-tags', PROMPT_DATABASE.body_features, 'global');
    if (PROMPT_DATABASE.environment) renderTags('environment-tags', PROMPT_DATABASE.environment, 'global');
    if (PROMPT_DATABASE.visual_effects) renderTags('visual-effects-tags', PROMPT_DATABASE.visual_effects, 'global');
    if (PROMPT_DATABASE.hand_details) renderTags('hand-details-tags', PROMPT_DATABASE.hand_details, 'global');
    
    renderTags('camera-tags', PROMPT_DATABASE.camera, 'camera');
    renderTags('background-tags', PROMPT_DATABASE.background, 'background');
    renderTags('lighting-tags', PROMPT_DATABASE.lighting, 'lighting');
    
    if (PROMPT_DATABASE.sexual_positions) renderTags('sexual-positions-tags', PROMPT_DATABASE.sexual_positions, 'global');
    if (PROMPT_DATABASE.sex_acts) renderTags('sex-acts-tags', PROMPT_DATABASE.sex_acts, 'global');
    if (PROMPT_DATABASE.cum) renderTags('cum-tags', PROMPT_DATABASE.cum, 'global');
    if (PROMPT_DATABASE.bondage) renderTags('bondage-tags', PROMPT_DATABASE.bondage, 'global');
    if (PROMPT_DATABASE.nsfw_context) renderTags('nsfw-context-tags', PROMPT_DATABASE.nsfw_context, 'global');
    if (PROMPT_DATABASE.nsfw_masturbation) renderTags('nsfw-masturbation-tags', PROMPT_DATABASE.nsfw_masturbation, 'global');
    if (PROMPT_DATABASE.nsfw_toys) renderTags('nsfw-toys-tags', PROMPT_DATABASE.nsfw_toys, 'global');
    if (PROMPT_DATABASE.nsfw_fluids) renderTags('nsfw-fluids-tags', PROMPT_DATABASE.nsfw_fluids, 'global');
    if (PROMPT_DATABASE.nsfw_advanced) renderTags('nsfw-advanced-tags', PROMPT_DATABASE.nsfw_advanced, 'global');
    if (PROMPT_DATABASE.physiology) renderTags('physiology-tags', PROMPT_DATABASE.physiology, 'global');
    if (PROMPT_DATABASE.clothing_disarray) renderTags('clothing-disarray-tags', PROMPT_DATABASE.clothing_disarray, 'global');
    if (PROMPT_DATABASE.erotic_camera) renderTags('erotic-camera-tags', PROMPT_DATABASE.erotic_camera, 'global');
    if (PROMPT_DATABASE.intense_expressions) renderTags('intense-expressions-tags', PROMPT_DATABASE.intense_expressions, 'global');
    if (PROMPT_DATABASE.aftermath) renderTags('aftermath-tags', PROMPT_DATABASE.aftermath, 'global');
        // 日常・生活ポーズ
    if (PROMPT_DATABASE.daily_life) renderTags('daily-life-tags', PROMPT_DATABASE.daily_life, 'global');
    document.getElementById('negative-output').value = PROMPT_DATABASE.negative.base;
    updateTranslationDisplay();
}

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

        btn.onclick = () => {
            toggleTag(tag, stateKey, btn);
            if (btn.classList.contains('selected')) {
                showWeightPanel(tag, stateKey);
            } else {
                hideWeightPanel();
            }
        };

        container.appendChild(btn);
    });
}

function renderCharacters() {
    const wrapper = document.getElementById('characters-wrapper');
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
            { key: 'breasts', label: '胸・バスト:' },
            { key: 'nipples', label: '乳首詳細:' },
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

function updateOutput() {
    const segments = [];

    // 1. グローバルタグ（Quality/Style/Rating + Person Count/Interaction）
    if (appState.global.size > 0) {
        const weightedGlobal = Array.from(appState.global).map(getWeightedValue);
        segments.push(weightedGlobal.join(', '));
    }

    // 2. キャラクター（BREAK区切り）
    const characterSegments = [];
    appState.characters.forEach(character => {
        const allCharacterTags = [];
        const order = [
            // Crody推奨：Top to Bottom順序
            'hair_color', 'hair_length', 'hair_style',
            'eyes', 'eye_shape', 'eye_details', 'eye_internal', 'eye_direction', 'eyebrows',
            'breasts', 'nipples',
            'clothing', 'clothing_state', 'clothing_disarray',
            'pose', 'hand_gestures',
            // 男性用タグ
            'male_body_type', 'male_facial', 'male_age_type',
            'male_clothing', 'male_body_hair', 'male_genitalia', 'male_poses', 'male_expressions'
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

    // ★ Crody準拠：カメラ・背景の前にBREAK追加
    if (segments.length > 0 && (appState.camera.size > 0 || appState.background.size > 0)) {
        segments.push('BREAK');
    }

    // 3. カメラ・背景
    const cameraBackground = [
        ...Array.from(appState.camera).map(getWeightedValue),
        ...Array.from(appState.background).map(getWeightedValue)
    ].filter(Boolean);

    if (cameraBackground.length > 0) {
        segments.push(cameraBackground.join(', '));
    }

    // 4. ライティング（BREAK前置 - 既存のまま）
    if (appState.lighting.size > 0) {
        if (segments.length > 0) segments.push('BREAK');
        const weightedLighting = Array.from(appState.lighting).map(getWeightedValue);
        segments.push(weightedLighting.join(', '));
    }

    // 5. プロンプト整形
    let finalPrompt;
    if (appState.segmentMode) {
        finalPrompt = segments.map(segment => {
            if (segment === 'BREAK') return '\nBREAK\n';
            if (segment.includes(' BREAK ')) {
                return segment
                    .split(' BREAK ')
                    .map(s => `[${s}]`)
                    .join('\nBREAK\n');
            }
            return `[${segment}]`;
        }).join('\n');
    } else {
        finalPrompt = segments.join(', ');
    }

    document.getElementById('positive-output').value = finalPrompt;
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
    
    document.getElementById('negative-output').value = negative;
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
            'eyes', 'eye_shape', 'eye_details', 'eyebrows',
            'breasts', 'nipples', 'clothing', 'pose',
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
    element.select();
    document.execCommand('copy');
    
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = '✓ コピー完了';
    btn.style.background = 'var(--accent-green)';
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
    }, 2000);
}

function setupPresetListeners() {
    document.getElementById('save-preset').addEventListener('click', savePreset);
    document.getElementById('load-preset').addEventListener('click', loadPreset);
    document.getElementById('delete-preset').addEventListener('click', deletePreset);
    loadPresetList();
}

function savePreset() {
    const name = document.getElementById('preset-name').value.trim();
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
    const name = document.getElementById('preset-list').value;
    if (!name) return;
    
    const data = JSON.parse(localStorage.getItem(`preset_${name}`));
    if (!data) return;
    
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
    const name = document.getElementById('preset-list').value;
    if (!name) return;
    
    if (confirm('削除しますか？')) {
        localStorage.removeItem(`preset_${name}`);
        loadPresetList();
    }
}

function loadPresetList() {
    const select = document.getElementById('preset-list');
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


