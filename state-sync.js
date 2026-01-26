// ==========================================
// js/shared/state-sync.js - ページ間データ同期管理
// ==========================================

const STATE_KEY = 'illustrious_app_state';
const SYNC_VERSION = '1.0'; // データ形式のバージョン管理

const StateSyncManager = {
    /**
     * 現在の状態をローカルストレージに保存
     * タグをクリックするたびに自動実行される
     */
    save(appState) {
        try {
            // SetオブジェクトはJSON化できないので配列に変換
            const serializedState = {
                version: SYNC_VERSION,
                timestamp: Date.now(),
                global: Array.from(appState.global),
                characters: appState.characters.map(char => {
                    const charObj = {};
                    Object.keys(char).forEach(key => {
                        charObj[key] = Array.from(char[key]);
                    });
                    return charObj;
                }),
                camera: Array.from(appState.camera),
                background: Array.from(appState.background),
                lighting: Array.from(appState.lighting),
                segmentMode: appState.segmentMode
            };
            
            localStorage.setItem(STATE_KEY, JSON.stringify(serializedState));
            console.log('✅ 状態を保存しました:', serializedState.timestamp);
            return true;
        } catch (error) {
            console.error('❌ 状態保存エラー:', error);
            if (error.name === 'QuotaExceededError') {
                this.handleStorageQuotaExceeded();
            }
            return false;
        }
    },

    /**
     * ローカルストレージから状態を読み込み
     * ページロード時に実行される
     */
    load() {
        try {
            const saved = localStorage.getItem(STATE_KEY);
            if (!saved) {
                console.log('📝 初回起動：デフォルト状態を使用');
                return null;
            }

            const data = JSON.parse(saved);
            
            // バージョン確認
            if (data.version !== SYNC_VERSION) {
                console.warn('⚠️ データバージョンが異なります。リセットします。');
                this.clear();
                return null;
            }

            // 配列をSetオブジェクトに復元
            const restoredState = {
                global: new Set(data.global),
                characters: data.characters.map(char => {
                    const charObj = {};
                    Object.keys(char).forEach(key => {
                        charObj[key] = new Set(char[key]);
                    });
                    return charObj;
                }),
                camera: new Set(data.camera),
                background: new Set(data.background),
                lighting: new Set(data.lighting),
                segmentMode: data.segmentMode
            };

            console.log('✅ 状態を復元しました:', new Date(data.timestamp));
            return restoredState;
        } catch (error) {
            console.error('❌ 状態読み込みエラー:', error);
            return null;
        }
    },

    /**
     * 保存データをクリア
     */
    clear() {
        localStorage.removeItem(STATE_KEY);
        console.log('🗑️ 保存データをクリアしました');
    },

    /**
     * ストレージ容量不足時の処理
     */
    handleStorageQuotaExceeded() {
        alert('⚠️ 保存容量が不足しています！\n\n' +
              '画像ファイルやプリセットが容量を消費しています。\n' +
              '「設定」→「データ管理」から不要なデータを削除してください。');
    },

    /**
     * 自動保存の設定（タグ操作時に呼び出す）
     */
    autoSave(appState) {
        // デバウンス処理：連続操作時は最後の操作から500ms後に保存
        clearTimeout(this.saveTimeout);
        this.saveTimeout = setTimeout(() => {
            this.save(appState);
        }, 500);
    },

    /**
     * データサイズの確認
     */
    getStorageInfo() {
        const data = localStorage.getItem(STATE_KEY);
        if (!data) return { size: 0, sizeKB: 0 };
        
        const size = data.length;
        const sizeKB = Math.round(size / 1024 * 100) / 100;
        return { size, sizeKB };
    }
};

// グローバルに公開
window.StateSyncManager = StateSyncManager;
