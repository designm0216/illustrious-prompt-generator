const PROMPT_DATABASE = {
    // ==========================================
    // 1. 品質・スタイル・評価
    // ==========================================
    quality: [
        { 
            id: "q1", 
            label: "基本高品質セット（推奨）", 
            value: "masterpiece, best quality, amazing quality, very aesthetic, high resolution, ultra-detailed, absurdres"
        },
        { 
            id: "q2", 
            label: "4K高解像度", 
            value: "4k, 8k, highly detailed"
        },
        { 
            id: "q3", 
            label: "風景重視", 
            value: "scenery, detailed background"
        },
        { 
            id: "q_flat", 
            label: "フラットカラー（アニメ塗り）", 
            value: "flat color", 
            weight: 1.5 
        }
    ],

    style: [
        { id: "s1", label: "最新（newest）", value: "newest", exclusive: "time_period" },
        { id: "s2", label: "最近（recent）", value: "recent", exclusive: "time_period" },
        { id: "s3", label: "現代（modern）", value: "modern", exclusive: "time_period" },
        { id: "s4", label: "アニメキャプチャ風", value: "anime screencap" },
        { id: "s5", label: "公式アート風", value: "official art" },
        { id: "s6", label: "水彩画風", value: "watercolor (medium)" },
        { id: "s7", label: "スケッチ風", value: "sketch" }
    ],

    rating: [
        { id: "r1", label: "一般向け", value: "general", exclusive: "rating" },
        { id: "r2", label: "センシティブ", value: "sensitive", exclusive: "rating" },
        { id: "r3", label: "際どい内容", value: "questionable", exclusive: "rating", nsfw: true },
        { id: "r4", label: "成人向け", value: "explicit", exclusive: "rating", nsfw: true }
    ],

    // ==========================================
    // 2. 人数・インタラクション
    // ==========================================
    count: [
        { id: "c1", label: "1人の女性（単独）", value: "1girl, solo", exclusive: "count" },
        { id: "c2", label: "1人の男性", value: "1boy", exclusive: "count" },
        { id: "c3", label: "2人の女性", value: "2girls", exclusive: "count" },
        { id: "c4", label: "男女ペア", value: "1girl, 1boy", exclusive: "count" },
        { id: "c5", label: "複数の女性", value: "multiple girls", exclusive: "count" }
    ],

    interaction: [
        { id: "i1", label: "背中合わせ", value: "back-to-back" },
        { id: "i2", label: "手を繋ぐ", value: "holding hands" },
        { id: "i3", label: "抱きしめる", value: "hug, embrace" },
        { id: "i4", label: "キス", value: "kiss, kissing", nsfw: true },
        { id: "i5", label: "見つめ合う", value: "looking at each other" },
        { id: "i6", label: "頬と頬", value: "cheek-to-cheek" }
    ],

    // ==========================================
    // 3. キャラクター詳細
    // ==========================================
    character: {
        hair_color: [
            { id: "h1", label: "金髪", value: "blonde hair" },
            { id: "h2", label: "茶髪", value: "brown hair" },
            { id: "h3", label: "黒髪", value: "black hair" },
            { id: "h4", label: "赤髪", value: "red hair" },
            { id: "h5", label: "ピンク髪", value: "pink hair" },
            { id: "h6", label: "青髪", value: "blue hair" },
            { id: "h7", label: "緑髪", value: "green hair" },
            { id: "h8", label: "紫髪", value: "purple hair" },
            { id: "h9", label: "銀髪", value: "silver hair" },
            { id: "h10", label: "白髪", value: "white hair" },
            { id: "h11", label: "グラデーション髪", value: "multicolored hair, gradient hair" }
        ],

        hair_length: [
            { id: "hl1", label: "ショートヘア", value: "short hair", exclusive: "hair_length" },
            { id: "hl2", label: "ミディアムヘア", value: "medium hair", exclusive: "hair_length" },
            { id: "hl3", label: "ロングヘア", value: "long hair", exclusive: "hair_length" },
            { id: "hl4", label: "超ロングヘア", value: "very long hair", exclusive: "hair_length" }
        ],

               hair_style: [
            // ==========================
            // Ponytail / Buns 系（Danbooru基本分類）
            // ==========================
            { id: "hs1",  label: "ポニーテール", value: "ponytail" },
            { id: "hs2",  label: "ローポニーテール", value: "low ponytail" },
            { id: "hs3",  label: "ハイポニーテール", value: "high ponytail" },
            { id: "hs4",  label: "サイドポニー", value: "side ponytail" },
            { id: "hs5",  label: "ツインテール", value: "twintails" },
            { id: "hs6",  label: "ツーサイドアップ", value: "two side up" },
            { id: "hs7",  label: "お団子ヘア", value: "hair bun" },
            { id: "hs8",  label: "ツインお団子", value: "double bun, twin buns" },
            { id: "hs9",  label: "オダンゴ＋ツインテール", value: "odango, twintails" },

            // ==========================
            // Braids 系（三つ編み - Danbooru頻出）
            // ==========================
            { id: "hs10", label: "三つ編み（一本）", value: "braid" },
            { id: "hs11", label: "お下げ（三つ編み×2）", value: "twin braids" },
            { id: "hs12", label: "サイド三つ編み", value: "side braid" },
            { id: "hs13", label: "ポニーテール三つ編み", value: "braided ponytail" },
            { id: "hs14", label: "フレンチブレイド", value: "french braid" },
            { id: "hs15", label: "フィッシュテールブレイド", value: "fishtail braid" },
            { id: "hs16", label: "クラウンブレイド", value: "crown braid" },
            { id: "hs17", label: "編み込みアップ", value: "braided updo" },

            // ==========================
            // Bangs 系（前髪 - Danbooru標準分類）
            // ==========================
            { id: "hs20", label: "ぱっつん前髪", value: "blunt bangs" },
            { id: "hs21", label: "サイド前髪", value: "side bangs" },
            { id: "hs22", label: "流し前髪", value: "swept bangs" },
            { id: "hs23", label: "センター分け前髪", value: "parted bangs" },
            { id: "hs24", label: "短め前髪（オン眉）", value: "short bangs" },
            { id: "hs25", label: "長め前髪", value: "long bangs" },
            { id: "hs26", label: "シースルーバング", value: "see-through bangs" },
            { id: "hs27", label: "前髪なし", value: "no bangs" },
            { id: "hs28", label: "アシンメトリー前髪", value: "asymmetrical bangs" },

            // ==========================
            // Cuts 系（カット・シルエット）
            // ==========================
            { id: "hs30", label: "ボブカット", value: "bob cut" },
            { id: "hs31", label: "ショートボブ", value: "short bob" },
            { id: "hs32", label: "ロングボブ", value: "long bob" },
            { id: "hs33", label: "ピクシーカット", value: "pixie cut" },
            { id: "hs34", label: "おかっぱ", value: "bowl cut" },
            { id: "hs35", label: "ウルフカット", value: "wolf cut" },
            { id: "hs36", label: "レイヤーカット", value: "layered hair" },
            { id: "hs37", label: "姫カット", value: "hime cut" },
            { id: "hs38", label: "アシンメトリーカット", value: "asymmetrical hair" },

            // ==========================
            // Texture 系（質感 - AI生成重要）
            // ==========================
            { id: "hs40", label: "ストレートヘア", value: "straight hair" },
            { id: "hs41", label: "ウェーブヘア", value: "wavy hair" },
            { id: "hs42", label: "カーリーヘア", value: "curly hair" },
            { id: "hs43", label: "パーマヘア", value: "permed hair" },
            { id: "hs44", label: "ドリルツインテール", value: "drill hair, ringlets" },
            { id: "hs45", label: "リングレット", value: "ringlets" },
            { id: "hs46", label: "ふわふわヘア", value: "fluffy hair" },
            { id: "hs47", label: "ボリュームヘア", value: "voluminous hair" },
            { id: "hs48", label: "ツヤ髪", value: "shiny hair" },

            // ==========================
            // Updos 系（アップスタイル）
            // ==========================
            { id: "hs50", label: "ハーフアップ", value: "half updo" },
            { id: "hs51", label: "アップヘア", value: "hair up, updo" },
            { id: "hs52", label: "シニヨン", value: "chignon" },
            { id: "hs53", label: "ハーフアップバン", value: "half up bun" },
            { id: "hs54", label: "フレンチツイスト", value: "french twist" },
            { id: "hs55", label: "ギブソンタック", value: "gibson tuck" },

            // ==========================
            // Anime/Manga 特殊系（Danbooru頻出）
            // ==========================
            { id: "hs60", label: "アホ毛", value: "ahoge" },
            { id: "hs61", label: "一本アホ毛", value: "single ahoge" },
            { id: "hs62", label: "触角ヘア", value: "antenna hair" },
            { id: "hs63", label: "メカクレ（片目隠し）", value: "hair over one eye" },
            { id: "hs64", label: "メカクレ（両目隠し）", value: "hair over eyes" },
            { id: "hs65", label: "サイドロック（長い横髪）", value: "long sidelocks" },
            { id: "hs66", label: "重力無視の髪", value: "gravity-defying hair", weight: 1.2 },
            { id: "hs67", label: "フローティングヘア", value: "floating hair", weight: 1.2 },

            // ==========================
            // 状態・シチュエーション系
            // ==========================
            { id: "hs70", label: "寝癖・ボサボサ", value: "messy hair, bed hair" },
            { id: "hs71", label: "乱れ髪", value: "disheveled hair" },
            { id: "hs72", label: "濡れ髪", value: "wet hair", weight: 1.2 },
            { id: "hs73", label: "汗で濡れた髪", value: "sweaty hair", nsfw: true, weight: 1.2 },
            { id: "hs74", label: "風になびく髪", value: "hair blowing in wind", weight: 1.1 },
            { id: "hs75", label: "耳にかけた髪", value: "hair behind ear" },
            { id: "hs76", label: "髪をかき上げ", value: "hair tucking" },
            { id: "hs77", label: "髪を触る", value: "touching hair" },

            // ==========================
            // クール・個性的系（男女共用）
            // ==========================
            { id: "hs80", label: "アンダーカット", value: "undercut" },
            { id: "hs81", label: "ツーブロック", value: "two-block cut" },
            { id: "hs82", label: "サイドシェーブ", value: "side shave" },
            { id: "hs83", label: "モヒカン", value: "mohawk" },
            { id: "hs84", label: "刈り上げショート", value: "short undercut" },
            { id: "hs85", label: "坊主頭", value: "buzz cut" },
            { id: "hs86", label: "スキンヘッド", value: "shaved head, bald" },

            // ==========================
            // カラー・装飾系（スタイル寄せ）
            // ==========================
            { id: "hs90", label: "インナーカラー", value: "colored inner hair" },
            { id: "hs91", label: "メッシュ（ハイライト）", value: "streaked hair" },
            { id: "hs92", label: "ツートーンヘア", value: "two-tone hair" },
            { id: "hs93", label: "グラデーションヘア", value: "gradient hair" },
            { id: "hs94", label: "リボン編み込み", value: "ribbon in hair" },
            { id: "hs95", label: "花飾りヘア", value: "flower in hair" }
        ],


        eyes: [
            { id: "e1", label: "青い瞳", value: "blue eyes" },
            { id: "e2", label: "茶色の瞳", value: "brown eyes" },
            { id: "e3", label: "緑の瞳", value: "green eyes" },
            { id: "e4", label: "赤い瞳", value: "red eyes" },
            { id: "e5", label: "紫の瞳", value: "purple eyes" },
            { id: "e6", label: "オッドアイ", value: "heterochromia" },
            { id: "e7", label: "発光する瞳", value: "glowing eyes", weight: 1.3 }
        ],

        eye_shape: [
            { id: "es1", label: "垂れ目", value: "tareme, droopy eyes" },
            { id: "es2", label: "つり目", value: "tsurime, upturned eyes" },
            { id: "es3", label: "ジト目", value: "jitome, half-closed eyes" },
            { id: "es4", label: "三白眼", value: "sanpaku" },
            { id: "es5", label: "細目", value: "narrowed eyes" },
            { id: "es6", label: "見開いた目", value: "wide-eyed" },
            { id: "es7", label: "半開き", value: "half-closed eyes" },
            { id: "es8", label: "目を閉じる", value: "closed eyes" },
            { id: "es9", label: "片目閉じ", value: "one eye closed" },
            { id: "es10", label: "涙目", value: "watery eyes, teary eyes" },
            { id: "es11", label: "とろ目", value: "bedroom eyes", nsfw: true },
            { id: "es12", label: "虚ろな目", value: "empty eyes", weight: 1.2 },
            { id: "es13", label: "メカクレ", value: "hair over eyes, eyes visible through hair" }
        ],

        eye_details: [
            { id: "ed1", label: "キラキラした瞳", value: "sparkling eyes" },
            { id: "ed2", label: "ハート目", value: "heart-shaped pupils", weight: 1.2 },
            { id: "ed3", label: "星目", value: "star-shaped pupils", weight: 1.2 },
            { id: "ed4", label: "渦巻き目", value: "spiral eyes", weight: 1.2 },
            { id: "ed5", label: "×目", value: "x x eyes" },
            { id: "ed6", label: "縦長瞳孔", value: "slit pupils" },
            { id: "ed7", label: "発光する瞳", value: "glowing eyes", weight: 1.3 },
            { id: "ed8", label: "ハイライト無し", value: "empty eyes, no highlights", weight: 1.1 },
            { id: "ed9", label: "グラデーション瞳", value: "gradient eyes" },
            { id: "ed10", label: "リング状瞳", value: "ringed eyes" },
            { id: "ed11", label: "長いまつげ", value: "long eyelashes" },
            { id: "ed12", label: "太いまつげ", value: "thick eyelashes" },
            { id: "ed13", label: "マスカラ", value: "mascara" }
        ],

        eyebrows: [
            { id: "eb1", label: "普通の眉", value: "normal eyebrows" },
            { id: "eb2", label: "太い眉", value: "thick eyebrows" },
            { id: "eb3", label: "細い眉", value: "thin eyebrows" },
            { id: "eb4", label: "短い眉", value: "short eyebrows" },
            { id: "eb5", label: "V字眉", value: "v-shaped eyebrows" },
            { id: "eb6", label: "眉毛なし", value: "no eyebrows" },
            { id: "eb7", label: "一本眉", value: "unibrow" },
            { id: "eb8", label: "引眉（平安風）", value: "hikimayu" },
            { id: "eb9", label: "眉カット", value: "eyebrow cut" },
            { id: "eb10", label: "髪色と違う眉", value: "mismatched eyebrows" },
            { id: "eb11", label: "上げ眉（驚き）", value: "raised eyebrows" },
            { id: "eb12", label: "片眉上げ", value: "raised eyebrow" },
            { id: "eb13", label: "困り眉", value: "furrowed brow, worried" },
            { id: "eb14", label: "怒り眉", value: "angry eyebrows, furrowed brow" },
            { id: "eb15", label: "しかめ眉", value: "furrowed brow" },
            { id: "eb16", label: "片上げ片下げ眉", value: "cocked eyebrow" }
        ],

        breasts: [
            { id: "br1", label: "平坦な胸", value: "flat chest", exclusive: "breast_size" },
            { id: "br2", label: "小さい胸", value: "small breasts", exclusive: "breast_size" },
            { id: "br3", label: "中くらいの胸", value: "medium breasts", exclusive: "breast_size" },
            { id: "br4", label: "大きい胸", value: "large breasts", exclusive: "breast_size", nsfw: true },
            { id: "br5", label: "巨大な胸", value: "huge breasts", exclusive: "breast_size", nsfw: true },
            { id: "br6", label: "谷間", value: "cleavage", nsfw: true },
            { id: "br7", label: "横乳", value: "sideboob", nsfw: true },
            { id: "br8", label: "下乳", value: "underboob", nsfw: true },
            { id: "br9", label: "揺れる胸", value: "bouncing breasts", nsfw: true }
        ],

        nipples: [
            { id: "np1", label: "乳首", value: "nipples", nsfw: true },
            { id: "np2", label: "膨らんだ乳首", value: "puffy nipples", nsfw: true },
            { id: "np3", label: "色付き乳首", value: "colored nipples", nsfw: true },
            { id: "np4", label: "陥没乳首", value: "inverted nipples", nsfw: true }
        ],

            // ★ 衣装の色セクションを追加
    clothing_color: [
        // 基本色
        { id: "cc1", label: "白", value: "white" },
        { id: "cc2", label: "黒", value: "black" },
        { id: "cc3", label: "赤", value: "red" },
        { id: "cc4", label: "青", value: "blue" },
        { id: "cc5", label: "緑", value: "green" },
        { id: "cc6", label: "黄色", value: "yellow" },
        { id: "cc7", label: "ピンク", value: "pink" },
        { id: "cc8", label: "紫", value: "purple" },
        { id: "cc9", label: "オレンジ", value: "orange" },
        { id: "cc10", label: "茶色", value: "brown" },
        { id: "cc11", label: "グレー", value: "grey" },
        
        // 特殊色
        { id: "cc12", label: "ネイビー", value: "navy blue" },
        { id: "cc13", label: "ライトブルー", value: "light blue" },
        { id: "cc14", label: "ダークブルー", value: "dark blue" },
        { id: "cc15", label: "パステルピンク", value: "pastel pink" },
        { id: "cc16", label: "金色", value: "gold" },
        { id: "cc17", label: "銀色", value: "silver" },
        { id: "cc18", label: "虹色", value: "rainbow" },
        
        // 柄・パターン
        { id: "cc19", label: "縞模様", value: "striped" },
        { id: "cc20", label: "チェック柄", value: "plaid" },
        { id: "cc21", label: "水玉模様", value: "polka dot" },
        { id: "cc22", label: "花柄", value: "floral print" },
        { id: "cc23", label: "無地", value: "solid color" }
    ],

        clothing: [
            { id: "cl1", label: "セーラー服", value: "serafuku, sailor collar" },
            { id: "cl2", label: "学校制服", value: "school uniform" },
            { id: "cl3", label: "ブレザー制服", value: "blazer, school uniform" },
            { id: "cl4", label: "学ラン", value: "gakuran" },
            { id: "cl5", label: "ネクタイ", value: "necktie" },
            { id: "cl6", label: "リボン", value: "ribbon, neck ribbon" },
            { id: "cl7", label: "ボウタイ", value: "bowtie" },
            { id: "cl8", label: "スクールバッグ", value: "school bag" },
            { id: "cl10", label: "Tシャツ", value: "t-shirt" },
            { id: "cl11", label: "タンクトップ", value: "tank top" },
            { id: "cl12", label: "キャミソール", value: "camisole" },
            { id: "cl13", label: "ブラウス", value: "blouse" },
            { id: "cl14", label: "シャツ", value: "shirt, collared shirt" },
            { id: "cl15", label: "ワイシャツ", value: "white shirt" },
            { id: "cl16", label: "セーター", value: "sweater" },
            { id: "cl17", label: "カーディガン", value: "cardigan" },
            { id: "cl18", label: "パーカー", value: "hoodie" },
            { id: "cl19", label: "ジャケット", value: "jacket" },
            { id: "cl20", label: "コート", value: "coat" },
            { id: "cl21", label: "トレンチコート", value: "trench coat" },
            { id: "cl22", label: "オフショルダー", value: "off-shoulder shirt", nsfw: true },
            { id: "cl23", label: "クロップトップ", value: "crop top", nsfw: true },
            { id: "cl24", label: "へそ出し", value: "midriff, navel cutout" },
            { id: "cl25", label: "ノースリーブ", value: "sleeveless" },
            { id: "cl30", label: "スカート", value: "skirt" },
            { id: "cl31", label: "ミニスカート", value: "miniskirt", nsfw: true },
            { id: "cl32", label: "プリーツスカート", value: "pleated skirt" },
            { id: "cl33", label: "ロングスカート", value: "long skirt" },
            { id: "cl34", label: "フレアスカート", value: "flared skirt" },
            { id: "cl35", label: "タイトスカート", value: "pencil skirt" },
            { id: "cl36", label: "ジーンズ", value: "jeans" },
            { id: "cl37", label: "デニムショーツ", value: "denim shorts" },
            { id: "cl38", label: "ショートパンツ", value: "shorts" },
            { id: "cl39", label: "ホットパンツ", value: "short shorts", nsfw: true },
            { id: "cl40", label: "レギンス", value: "leggings" },
            { id: "cl41", label: "スラックス", value: "pants" },
            { id: "cl42", label: "ブルマ", value: "buruma", nsfw: true },
            { id: "cl50", label: "ワンピース", value: "dress" },
            { id: "cl51", label: "サンドレス", value: "sundress" },
            { id: "cl52", label: "ウェディングドレス", value: "wedding dress" },
            { id: "cl53", label: "イブニングドレス", value: "evening gown" },
            { id: "cl54", label: "パーティードレス", value: "cocktail dress" },
            { id: "cl55", label: "ミニドレス", value: "minidress", nsfw: true },
            { id: "cl56", label: "チャイナドレス", value: "china dress, qipao" },
            { id: "cl60", label: "サイハイソックス", value: "thighhighs" },
            { id: "cl61", label: "ニーソックス", value: "kneehighs" },
            { id: "cl62", label: "ルーズソックス", value: "loose socks" },
            { id: "cl63", label: "白ソックス", value: "white socks" },
            { id: "cl64", label: "タイツ", value: "pantyhose" },
            { id: "cl65", label: "黒タイツ", value: "black pantyhose" },
            { id: "cl66", label: "白タイツ", value: "white pantyhose" },
            { id: "cl67", label: "網タイツ", value: "fishnet stockings", nsfw: true },
            { id: "cl68", label: "ガーターベルト", value: "garter belt", nsfw: true },
            { id: "cl69", label: "裸足", value: "barefoot" },
            { id: "cl70", label: "ローファー", value: "loafers" },
            { id: "cl71", label: "スニーカー", value: "sneakers" },
            { id: "cl72", label: "ハイヒール", value: "high heels" },
            { id: "cl73", label: "ブーツ", value: "boots" },
            { id: "cl74", label: "ニーブーツ", value: "knee boots" },
            { id: "cl75", label: "サンダル", value: "sandals" },
            { id: "cl76", label: "上履き", value: "uwabaki, indoor shoes" },
            { id: "cl77", label: "パンプス", value: "pumps" },
            { id: "cl80", label: "ブラジャー", value: "bra", nsfw: true },
            { id: "cl81", label: "パンティ", value: "panties", nsfw: true },
            { id: "cl82", label: "ランジェリー", value: "lingerie", nsfw: true },
            { id: "cl83", label: "レースランジェリー", value: "lace lingerie", nsfw: true, weight: 1.2 },
            { id: "cl84", label: "Tバック", value: "thong", nsfw: true },
            { id: "cl85", label: "ノーパン", value: "no panties", nsfw: true, weight: 1.2 },
            { id: "cl86", label: "ノーブラ", value: "no bra", nsfw: true },
            { id: "cl87", label: "コルセット", value: "corset", nsfw: true },
            { id: "cl88", label: "ベビードール", value: "babydoll", nsfw: true },
            { id: "cl90", label: "ビキニ", value: "bikini", nsfw: true },
            { id: "cl91", label: "マイクロビキニ", value: "micro bikini", nsfw: true, weight: 1.3 },
            { id: "cl92", label: "紐ビキニ", value: "string bikini", nsfw: true },
            { id: "cl93", label: "ワンピース水着", value: "one-piece swimsuit", nsfw: true },
            { id: "cl94", label: "スクール水着", value: "school swimsuit", nsfw: true },
            { id: "cl95", label: "競泳水着", value: "competition swimsuit", nsfw: true },
            { id: "cl96", label: "ビキニアーマー", value: "bikini armor", nsfw: true },
            { id: "cl100", label: "メイド服", value: "maid, maid headdress" },
            { id: "cl101", label: "ナース服", value: "nurse" },
            { id: "cl102", label: "バニーガール", value: "bunny girl, playboy bunny", nsfw: true },
            { id: "cl103", label: "警察官", value: "police uniform" },
            { id: "cl104", label: "軍服", value: "military uniform" },
            { id: "cl105", label: "巫女装束", value: "miko, shrine maiden" },
            { id: "cl106", label: "ウェイトレス", value: "waitress" },
            { id: "cl107", label: "スチュワーデス", value: "flight attendant" },
            { id: "cl108", label: "サンタ衣装", value: "santa costume" },
            { id: "cl109", label: "アイドル衣装", value: "idol costume, stage outfit" },
            { id: "cl110", label: "魔法少女", value: "magical girl" },
            { id: "cl115", label: "着物", value: "kimono, japanese clothes" },
            { id: "cl116", label: "浴衣", value: "yukata" },
            { id: "cl117", label: "振袖", value: "furisode" },
            { id: "cl118", label: "袴", value: "hakama" },
            { id: "cl119", label: "帯", value: "obi" },
            { id: "cl120", label: "男性着物", value: "male kimono, japanese clothes" },
            { id: "cl125", label: "スーツ", value: "suit, formal" },
            { id: "cl126", label: "タキシード", value: "tuxedo" },
            { id: "cl127", label: "ベスト", value: "vest" },
            { id: "cl128", label: "フォーマルドレス", value: "formal dress" },
            { id: "cl130", label: "体操服", value: "gym uniform" },
            { id: "cl131", label: "ジャージ", value: "track suit" },
            { id: "cl132", label: "スポーツブラ", value: "sports bra" },
            { id: "cl133", label: "レオタード", value: "leotard", nsfw: true },
            { id: "cl134", label: "ヨガウェア", value: "yoga outfit" },
            { id: "cl140", label: "鎧", value: "armor" },
            { id: "cl141", label: "ローブ", value: "robe" },
            { id: "cl142", label: "魔法使いローブ", value: "wizard robe" },
            { id: "cl143", label: "マント", value: "cape, cloak" },
            { id: "cl144", label: "戦闘服", value: "battle outfit" },
            { id: "cl145", label: "騎士服", value: "knight armor" },
            { id: "cl150", label: "ボンデージスーツ", value: "bondage outfit, latex", nsfw: true, weight: 1.3 },
            { id: "cl151", label: "ラバースーツ", value: "latex bodysuit", nsfw: true, weight: 1.3 },
            { id: "cl152", label: "透け服", value: "see-through", nsfw: true, weight: 1.3 },
            { id: "cl153", label: "濡れ透け", value: "wet clothes, see-through", nsfw: true, weight: 1.3 },
            { id: "cl154", label: "破れた服", value: "torn clothes", nsfw: true },
            { id: "cl155", label: "全裸", value: "nude, completely nude", nsfw: true, weight: 1.5 },
            { id: "cl156", label: "トップレス", value: "topless", nsfw: true, weight: 1.3 },
            { id: "cl157", label: "ボトムレス", value: "bottomless", nsfw: true, weight: 1.3 },
            { id: "cl158", label: "裸エプロン", value: "naked apron", nsfw: true, weight: 1.4 },
            { id: "cl160", label: "チョーカー", value: "choker" },
            { id: "cl161", label: "ネックレス", value: "necklace" },
            { id: "cl162", label: "イヤリング", value: "earrings" },
            { id: "cl163", label: "ブレスレット", value: "bracelet" },
            { id: "cl164", label: "手袋", value: "gloves" },
            { id: "cl165", label: "指なし手袋", value: "fingerless gloves" },
            { id: "cl166", label: "ベルト", value: "belt" },
            { id: "cl167", label: "スカーフ", value: "scarf" },
            { id: "cl168", label: "マフラー", value: "muffler" },
            { id: "cl170", label: "帽子", value: "hat" },
            { id: "cl171", label: "ベレー帽", value: "beret" },
            { id: "cl172", label: "キャップ", value: "baseball cap" },
            { id: "cl173", label: "麦わら帽子", value: "straw hat" },
            { id: "cl174", label: "カチューシャ", value: "hairband" },
            { id: "cl175", label: "髪リボン", value: "hair ribbon" },
            { id: "cl176", label: "ヘッドホン", value: "headphones" },
            { id: "cl177", label: "眼鏡", value: "glasses" },
            { id: "cl178", label: "サングラス", value: "sunglasses" },
            { id: "cl180", label: "エプロン", value: "apron" },
            { id: "cl181", label: "パジャマ", value: "pajamas" },
            { id: "cl182", label: "バスローブ", value: "bathrobe" },
            { id: "cl183", label: "タオル巻き", value: "towel, bath towel", nsfw: true },
            { id: "cl184", label: "首輪", value: "collar", nsfw: true },
            { id: "cl185", label: "猫耳カチューシャ", value: "cat ear headband" },
            { id: "cl186", label: "しっぽアクセサリー", value: "tail accessory" },
            { id: "cl187", label: "白衣", value: "lab coat" }
        ],

        pose: [
            { id: "p1", label: "立っている", value: "standing" },
            { id: "p2", label: "座っている", value: "sitting" },
            { id: "p3", label: "横たわる", value: "lying" },
            { id: "p4", label: "仰向け", value: "on back" },
            { id: "p5", label: "うつ伏せ", value: "on stomach" },
            { id: "p6", label: "横向き", value: "on side" },
            { id: "p7", label: "膝立ち", value: "kneeling" },
            { id: "p8", label: "片膝立ち", value: "on one knee" },
            { id: "p9", label: "しゃがむ", value: "squatting" },
            { id: "p10", label: "四つん這い", value: "all fours", nsfw: true },
            { id: "p11", label: "這う", value: "crawling" },
            { id: "p20", label: "椅子に座る", value: "sitting on chair" },
            { id: "p21", label: "床に座る", value: "sitting on floor" },
            { id: "p22", label: "正座", value: "seiza" },
            { id: "p23", label: "あぐら", value: "indian style" },
            { id: "p24", label: "割座（ぺたん座り）", value: "wariza" },
            { id: "p25", label: "足組み", value: "crossed legs" },
            { id: "p26", label: "体育座り", value: "knees up, hugging knees" },
            { id: "p27", label: "膝の上に座る", value: "sitting on lap" },
            { id: "p30", label: "こちらを見る", value: "looking at viewer" },
            { id: "p31", label: "横を見る", value: "looking to the side" },
            { id: "p32", label: "下を見る", value: "looking down" },
            { id: "p33", label: "上を見る", value: "looking up" },
            { id: "p34", label: "振り返る", value: "looking back" },
            { id: "p35", label: "首を傾げる", value: "head tilt" },
            { id: "p36", label: "微笑み", value: "smile" },
            { id: "p37", label: "にっこり笑顔", value: "grin" },
            { id: "p38", label: "ウィンク", value: "wink, one eye closed" },
            { id: "p39", label: "舌出し", value: "tongue out" },
            { id: "p40", label: "恥ずかしそう", value: "embarrassed" },
            { id: "p41", label: "怒り顔", value: "angry" },
            { id: "p50", label: "腕組み", value: "arms crossed" },
            { id: "p51", label: "腰に手", value: "hands on hips" },
            { id: "p52", label: "片腕上げ", value: "arm up" },
            { id: "p53", label: "両腕上げ", value: "arms up" },
            { id: "p54", label: "頭の後ろに手", value: "arms behind head" },
            { id: "p55", label: "腕を後ろに", value: "arm behind back" },
            { id: "p56", label: "手を振る", value: "waving" },
            { id: "p57", label: "ピースサイン", value: "peace sign, v" },
            { id: "p58", label: "ダブルピース", value: "double v" },
            { id: "p59", label: "指差し", value: "pointing" },
            { id: "p60", label: "敬礼", value: "salute" },
            { id: "p61", label: "口元に指", value: "finger to mouth" },
            { id: "p62", label: "頬杖", value: "chin rest" },
            { id: "p63", label: "髪を触る", value: "hair tucking" },
            { id: "p64", label: "祈り", value: "praying, hands clasped" },
            { id: "p65", label: "ハートポーズ", value: "heart hands" },
            { id: "p66", label: "力こぶ", value: "flexing" },
            { id: "p67", label: "手を伸ばす", value: "outstretched arm" },
            { id: "p70", label: "足を開く", value: "legs apart" },
            { id: "p71", label: "開脚", value: "spread legs", nsfw: true },
            { id: "p72", label: "片足上げ", value: "leg up" },
            { id: "p73", label: "両足上げ", value: "legs up" },
            { id: "p74", label: "片膝上げ", value: "knee up" },
            { id: "p75", label: "膝を胸に", value: "knees to chest" },
            { id: "p76", label: "つま先立ち", value: "tiptoes" },
            { id: "p77", label: "片足立ち", value: "standing on one leg" },
            { id: "p78", label: "開脚（ストレッチ）", value: "split, stretching" },
            { id: "p80", label: "前かがみ", value: "bent over", nsfw: true },
            { id: "p81", label: "反り返る", value: "arched back", nsfw: true },
            { id: "p82", label: "前に傾く", value: "leaning forward" },
            { id: "p83", label: "後ろに傾く", value: "leaning back" },
            { id: "p84", label: "猫背", value: "slouching" },
            { id: "p85", label: "体をひねる", value: "twisting torso" },
            { id: "p90", label: "歩く", value: "walking" },
            { id: "p91", label: "走る", value: "running" },
            { id: "p92", label: "ジャンプ", value: "jumping" },
            { id: "p93", label: "浮遊", value: "floating" },
            { id: "p94", label: "飛行", value: "flying" },
            { id: "p95", label: "落下", value: "falling" },
            { id: "p96", label: "踊る", value: "dancing" },
            { id: "p97", label: "ストレッチ", value: "stretching" },
            { id: "p98", label: "戦闘構え", value: "fighting stance" },
            { id: "p100", label: "逆立ち", value: "handstand" },
            { id: "p101", label: "頭立ち", value: "headstand" },
            { id: "p102", label: "逆さま", value: "upside-down" },
            { id: "p110", label: "背中合わせ", value: "back-to-back" },
            { id: "p111", label: "手をつなぐ", value: "holding hands" },
            { id: "p112", label: "ハグ", value: "hug" },
            { id: "p113", label: "後ろからハグ", value: "hug from behind" },
            { id: "p114", label: "お姫様抱っこ", value: "princess carry" },
            { id: "p115", label: "おんぶ", value: "piggyback" },
            { id: "p120", label: "セクシーポーズ", value: "seductive pose", nsfw: true, weight: 1.2 },
            { id: "p121", label: "誘惑", value: "inviting", nsfw: true, weight: 1.2 },
            { id: "p122", label: "お尻突き出し", value: "presenting hindquarters", nsfw: true, weight: 1.3 },
            { id: "p123", label: "胸を強調", value: "pushing breasts together", nsfw: true, weight: 1.2 },
            { id: "p124", label: "服めくり", value: "shirt lift, skirt lift", nsfw: true },
            { id: "p125", label: "マウンティング", value: "straddling, mounting", nsfw: true },
            { id: "p130", label: "ジョジョ立ち", value: "jojo pose", weight: 1.2 },
            { id: "p131", label: "ゲンドウポーズ", value: "gendou pose" },
            { id: "p132", label: "勝利のポーズ", value: "victory pose" },
            { id: "p133", label: "アイドルポーズ", value: "idol pose" },
            { id: "p134", label: "Tポーズ", value: "t-pose" },
            { id: "p140", label: "困った様子", value: "troubled, worried" },
            { id: "p141", label: "驚き", value: "surprised" },
            { id: "p142", label: "自信満々", value: "confident" },
            { id: "p143", label: "威圧的", value: "intimidating" },
            { id: "p144", label: "リラックス", value: "relaxed" },
            { id: "p145", label: "疲れた", value: "tired, exhausted" }
        ]
    },

    emotions: [
        { id: "em1", label: "赤面・照れ", value: "blush, embarrassed" },
        { id: "em2", label: "泣く・涙", value: "crying, tears, streaming tears" },
        { id: "em3", label: "怒り・しかめ面", value: "angry, furrowed brow, vein" },
        { id: "em4", label: "驚き・口開け", value: "surprised, open mouth" },
        { id: "em5", label: "舌出し", value: "tongue out" },
        { id: "em6", label: "ジト目", value: "jitome, half-closed eyes" },
        { id: "em7", label: "ハート目", value: "heart-shaped pupils", weight: 1.2 },
        { id: "em8", label: "無表情", value: "expressionless" },
        { id: "em9", label: "あくび", value: "yawning" },
        { id: "em10", label: "アヘ顔", value: "ahegao", nsfw: true, weight: 1.3 },
        { id: "em11", label: "恍惚・興奮", value: "aroused, naughty face", nsfw: true, weight: 1.2 }
    ],

    actions: [
        { id: "act1", label: "食べる", value: "eating" },
        { id: "act2", label: "飲む", value: "drinking" },
        { id: "act3", label: "寝る・眠る", value: "sleeping" },
        { id: "act4", label: "読書", value: "reading, holding book" },
        { id: "act5", label: "スマホ操作", value: "using phone, holding phone" },
        { id: "act6", label: "自撮り", value: "selfie" },
        { id: "act7", label: "料理する", value: "cooking" },
        { id: "act8", label: "戦闘・戦う", value: "fighting, battle stance" },
        { id: "act9", label: "魔法詠唱", value: "casting spell, magic", weight: 1.2 },
        { id: "act10", label: "ストレッチ", value: "stretching" },
        { id: "act11", label: "敬礼", value: "salute" },
        { id: "act12", label: "スカートめくり", value: "skirt lift", nsfw: true },
        { id: "act13", label: "服を脱ぐ", value: "undressing", nsfw: true, weight: 1.2 }
    ],

    // ==========================================
    // ★ 日常・生活ポーズ (Danbooru準拠)
    // ==========================================
    daily_life: [
        // ==========================
        // 基本の立ち・待機姿勢
        // ==========================
        { id: "dl1", label: "壁にもたれる", value: "leaning against wall" },
        { id: "dl2", label: "ポケットに手", value: "hands in pockets" },
        { id: "dl3", label: "腕を後ろで組む", value: "arms behind back" },
        { id: "dl4", label: "片足に重心", value: "contrapposto" },
        { id: "dl5", label: "時計を見る", value: "checking watch" },
        { id: "dl6", label: "待つ", value: "waiting" },

        // ==========================
        // リラックス・くつろぎ
        // ==========================
        { id: "dl10", label: "伸びをする", value: "stretching, arms up" },
        { id: "dl11", label: "あくび", value: "yawning" },
        { id: "dl12", label: "頬杖をつく", value: "chin rest, head resting on hand" },
        { id: "dl13", label: "椅子にゆったり座る", value: "sitting back in chair" },
        { id: "dl14", label: "床にペタン座り", value: "sitting on floor" },
        { id: "dl15", label: "うつ伏せで足パタパタ", value: "lying on stomach, legs up" },
        { id: "dl16", label: "ぐったり", value: "slouching, exhausted" },

        // ==========================
        // 移動・動き
        // ==========================
        { id: "dl20", label: "歩く", value: "walking" },
        { id: "dl21", label: "急ぎ足", value: "walking fast, hurrying" },
        { id: "dl22", label: "ゆっくり歩く", value: "walking slowly" },
        { id: "dl23", label: "振り返りながら歩く", value: "walking, looking back" },
        { id: "dl24", label: "階段を上る", value: "climbing stairs" },
        { id: "dl25", label: "転ぶ", value: "tripping, falling" },

        // ==========================
        // 食事・カフェタイム
        // ==========================
        { id: "dl30", label: "箸で食べる", value: "eating with chopsticks" },
        { id: "dl31", label: "フォークで食べる", value: "eating with fork" },
        { id: "dl32", label: "カップを持って飲む", value: "holding cup, drinking" },
        { id: "dl33", label: "ストローで飲む", value: "drinking through straw" },
        { id: "dl34", label: "おにぎりを食べる", value: "eating onigiri" },
        { id: "dl35", label: "口を拭く", value: "wiping mouth" },
        { id: "dl36", label: "乾杯", value: "cheers, toasting" },

        // ==========================
        // デジタル・現代生活
        // ==========================
        { id: "dl40", label: "スマホを見る", value: "looking at phone" },
        { id: "dl41", label: "スマホで自撮り", value: "taking selfie" },
        { id: "dl42", label: "電話で話す", value: "talking on phone" },
        { id: "dl43", label: "スマホでゲーム", value: "playing mobile game" },
        { id: "dl44", label: "タイピング", value: "typing" },
        { id: "dl45", label: "イヤホンで音楽", value: "listening to music, earphones" },

        // ==========================
        // 学習・読書・仕事
        // ==========================
        { id: "dl50", label: "本を読む（座り）", value: "reading book, sitting" },
        { id: "dl51", label: "本を読む（寝転び）", value: "reading book, lying down" },
        { id: "dl52", label: "ノートを取る", value: "taking notes, writing" },
        { id: "dl53", label: "勉強に集中", value: "studying, concentrated" },
        { id: "dl54", label: "机に突っ伏す", value: "head down on desk" },
        { id: "dl55", label: "本を抱える", value: "carrying books" },
        { id: "dl56", label: "考え込む", value: "thinking, pondering" },

        // ==========================
        // 身だしなみ・セルフケア
        // ==========================
        { id: "dl60", label: "髪を直す", value: "adjusting hair" },
        { id: "dl61", label: "髪を結ぶ", value: "tying hair" },
        { id: "dl62", label: "鏡を見る", value: "looking in mirror" },
        { id: "dl63", label: "化粧をする", value: "applying makeup" },
        { id: "dl64", label: "服を直す", value: "adjusting clothes" },
        { id: "dl65", label: "靴を履く", value: "putting on shoes" },

        // ==========================
        // 感情表現・反応
        // ==========================
        { id: "dl70", label: "驚く", value: "surprised, shocked" },
        { id: "dl71", label: "喜ぶ", value: "happy, delighted" },
        { id: "dl72", label: "落ち込む", value: "depressed, dejected" },
        { id: "dl73", label: "照れる", value: "embarrassed, shy" },
        { id: "dl74", label: "ため息", value: "sighing" },
        { id: "dl75", label: "ぼーっとする", value: "spacing out, daydreaming" }
    ],

    

    props: [
        { id: "pr1", label: "剣", value: "sword, holding sword" },
        { id: "pr2", label: "銃", value: "gun, holding gun" },
        { id: "pr3", label: "杖・スタッフ", value: "staff, holding staff" },
        { id: "pr4", label: "本", value: "book, holding book" },
        { id: "pr5", label: "スマートフォン", value: "smartphone, cellphone" },
        { id: "pr6", label: "花・花束", value: "flower, bouquet" },
        { id: "pr7", label: "傘", value: "umbrella" },
        { id: "pr8", label: "ぬいぐるみ", value: "stuffed toy, stuffed animal" },
        { id: "pr9", label: "眼鏡", value: "glasses" },
        { id: "pr10", label: "サングラス", value: "sunglasses" },
        { id: "pr11", label: "マスク", value: "mask, mouth mask" },
        { id: "pr12", label: "カップ・マグ", value: "cup, mug, holding cup" }
    ],

    fantasy: [
        { id: "ft1", label: "天使の翼", value: "angel wings, white wings", weight: 1.2 },
        { id: "ft2", label: "悪魔の翼", value: "demon wings, black wings", weight: 1.2 },
        { id: "ft3", label: "エルフ耳", value: "elf ears, pointy ears" },
        { id: "ft4", label: "猫耳", value: "cat ears, animal ears" },
        { id: "ft5", label: "狐耳", value: "fox ears, animal ears" },
        { id: "ft6", label: "うさぎ耳", value: "rabbit ears, bunny ears" },
        { id: "ft7", label: "犬耳", value: "dog ears, animal ears" },
        { id: "ft8", label: "角（ツノ）", value: "horns" },
        { id: "ft9", label: "尻尾", value: "tail" },
        { id: "ft10", label: "牙", value: "fangs" },
        { id: "ft11", label: "天使の輪", value: "halo" },
        { id: "ft12", label: "特殊な肌色", value: "colored skin", weight: 1.1 }
    ],

    body_features: [
        { id: "bf1", label: "小柄", value: "petite, small body" },
        { id: "bf2", label: "平均的身長", value: "average height" },
        { id: "bf3", label: "高身長", value: "tall" },
        { id: "bf4", label: "巨人系", value: "giant, giantess", weight: 1.3 },
        { id: "bf10", label: "スリム", value: "slim, slender" },
        { id: "bf11", label: "細身", value: "skinny, thin" },
        { id: "bf12", label: "普通体型", value: "average build" },
        { id: "bf13", label: "ぽっちゃり", value: "plump, chubby" },
        { id: "bf14", label: "グラマラス", value: "voluptuous, curvy", nsfw: true },
        { id: "bf15", label: "アスリート体型", value: "athletic, toned" },
        { id: "bf20", label: "白い肌", value: "pale skin" },
        { id: "bf21", label: "褐色肌", value: "dark skin, tan" },
        { id: "bf22", label: "日焼け跡", value: "tan lines", nsfw: true },
        { id: "bf23", label: "そばかす", value: "freckles" },
        { id: "bf24", label: "傷跡", value: "scar" },
        { id: "bf25", label: "ほくろ", value: "mole" },
        { id: "bf26", label: "タトゥー", value: "tattoo" },
        { id: "bf27", label: "汗", value: "sweat, sweating", weight: 1.2 },
        { id: "bf28", label: "濡れた肌", value: "wet skin", weight: 1.2 },
        { id: "bf29", label: "オイル肌", value: "oiled skin, shiny skin", weight: 1.2 },
        { id: "bf40", label: "太もも", value: "thick thighs", nsfw: true },
        { id: "bf41", label: "細い脚", value: "slender legs" },
        { id: "bf42", label: "長い脚", value: "long legs" },
        { id: "bf43", label: "大きい尻", value: "large ass, big butt", nsfw: true }
    ],

    environment: [
        { id: "env1", label: "朝", value: "morning, sunrise" },
        { id: "env2", label: "昼", value: "day, noon, daytime" },
        { id: "env3", label: "夕方", value: "sunset, dusk, evening" },
        { id: "env4", label: "夜", value: "night, nighttime" },
        { id: "env5", label: "深夜", value: "midnight, late night" },
        { id: "env6", label: "黄昏時", value: "twilight, golden hour" },
        { id: "env10", label: "晴れ", value: "sunny, clear sky" },
        { id: "env11", label: "曇り", value: "cloudy, overcast" },
        { id: "env12", label: "雨", value: "rain, raining" },
        { id: "env13", label: "大雨", value: "heavy rain, downpour" },
        { id: "env14", label: "雪", value: "snow, snowing" },
        { id: "env15", label: "霧", value: "fog, foggy" },
        { id: "env16", label: "雷", value: "lightning, thunder" },
        { id: "env20", label: "教室", value: "classroom" },
        { id: "env21", label: "図書館", value: "library" },
        { id: "env22", label: "寝室", value: "bedroom" },
        { id: "env23", label: "浴室", value: "bathroom, bath", nsfw: true },
        { id: "env24", label: "廊下", value: "hallway, corridor" },
        { id: "env25", label: "屋上", value: "rooftop" },
        { id: "env26", label: "体育館", value: "gymnasium" },
        { id: "env40", label: "公園", value: "park" },
        { id: "env41", label: "森", value: "forest, woods" },
        { id: "env42", label: "ビーチ", value: "beach, ocean" },
        { id: "env43", label: "都市", value: "city, cityscape" },
        { id: "env44", label: "駅", value: "train station" },
        { id: "env45", label: "神社", value: "shrine" },
        { id: "env46", label: "廃墟", value: "ruins, abandoned" }
    ],

    visual_effects: [
        { id: "vfx1", label: "レンズフレア", value: "lens flare", weight: 1.2 },
        { id: "vfx2", label: "ゴッドレイ", value: "god rays, light rays", weight: 1.2 },
        { id: "vfx3", label: "光の粒子", value: "light particles", weight: 1.2 },
        { id: "vfx4", label: "グロー効果", value: "glow, glowing", weight: 1.2 },
        { id: "vfx5", label: "逆光", value: "backlighting" },
        { id: "vfx6", label: "シルエット", value: "silhouette" },
        { id: "vfx10", label: "カラフル", value: "colorful, vibrant colors" },
        { id: "vfx11", label: "モノクロ", value: "monochrome, black and white" },
        { id: "vfx12", label: "セピア", value: "sepia" },
        { id: "vfx13", label: "パステルカラー", value: "pastel colors" },
        { id: "vfx14", label: "ネオンカラー", value: "neon colors" },
        { id: "vfx20", label: "モーションブラー", value: "motion blur", weight: 1.2 },
        { id: "vfx21", label: "ブルーム", value: "bloom", weight: 1.2 },
        { id: "vfx22", label: "フィルムグレイン", value: "film grain" },
        { id: "vfx23", label: "ビネット", value: "vignette" },
        { id: "vfx30", label: "桜吹雪", value: "cherry blossoms, petals" },
        { id: "vfx31", label: "雪の結晶", value: "snowflakes" },
        { id: "vfx32", label: "輝き", value: "sparkle, sparkling" },
        { id: "vfx33", label: "魔法陣", value: "magic circle" },
        { id: "vfx34", label: "炎", value: "fire, flames" },
        { id: "vfx35", label: "稲妻", value: "lightning" },
        { id: "vfx36", label: "煙", value: "smoke" },
        { id: "vfx37", label: "霧", value: "mist, haze" }
    ],

    hand_details: [
        { id: "hand1", label: "握りこぶし", value: "clenched hands, fist" },
        { id: "hand2", label: "開いた手", value: "open hands, spread fingers" },
        { id: "hand3", label: "リラックス", value: "relaxed hands" },
        { id: "hand4", label: "手を組む", value: "clasped hands, interlocked fingers" },
        { id: "hand10", label: "ピースサイン", value: "peace sign, v" },
        { id: "hand11", label: "ダブルピース", value: "double v" },
        { id: "hand12", label: "指差し", value: "pointing, index finger" },
        { id: "hand13", label: "親指立て", value: "thumbs up" },
        { id: "hand14", label: "中指立て", value: "middle finger", nsfw: true },
        { id: "hand15", label: "ハートポーズ", value: "heart hands" },
        { id: "hand20", label: "口元に手", value: "finger to mouth" },
        { id: "hand21", label: "頬杖", value: "chin rest, hand on cheek" },
        { id: "hand22", label: "髪を触る", value: "hair tucking, touching hair" },
        { id: "hand23", label: "胸を隠す", value: "covering breasts", nsfw: true },
        { id: "hand24", label: "股間を隠す", value: "covering crotch", nsfw: true },
        { id: "hand25", label: "手を繋ぐ", value: "holding hands" },
        { id: "hand30", label: "何かを持つ", value: "holding object" },
        { id: "hand31", label: "本を持つ", value: "holding book" },
        { id: "hand32", label: "スマホを持つ", value: "holding phone" },
        { id: "hand33", label: "武器を持つ", value: "holding weapon" }
    ],

    male_features: {
        body_type: [
            { id: "mb1", label: "普通体型", value: "average build" },
            { id: "mb2", label: "筋肉質", value: "muscular, muscular male", weight: 1.2 },
            { id: "mb3", label: "細マッチョ", value: "toned, athletic" },
            { id: "mb4", label: "ゴリマッチョ", value: "very muscular, bodybuilder", weight: 1.3 },
            { id: "mb5", label: "バラ系", value: "bara, muscular male", weight: 1.3, nsfw: true },
            { id: "mb6", label: "細身", value: "skinny, slender" },
            { id: "mb7", label: "ぽっちゃり", value: "chubby, fat" },
            { id: "mb8", label: "腹筋", value: "abs, six pack" },
            { id: "mb9", label: "胸筋", value: "pecs, pectoral muscles" },
            { id: "mb10", label: "上半身裸", value: "topless male, bare pectorals", nsfw: true }
        ],

        facial_features: [
            { id: "mf1", label: "髭なし", value: "clean-shaven", exclusive: "facial_hair" },
            { id: "mf2", label: "無精髭", value: "stubble", exclusive: "facial_hair" },
            { id: "mf3", label: "顎髭", value: "beard", exclusive: "facial_hair" },
            { id: "mf4", label: "口髭", value: "mustache", exclusive: "facial_hair" },
            { id: "mf5", label: "濃い眉", value: "thick eyebrows" },
            { id: "mf6", label: "鋭い目", value: "sharp eyes" },
            { id: "mf7", label: "傷跡", value: "scar, facial scar" },
            { id: "mf8", label: "眼帯", value: "eyepatch" }
        ],

        age_type: [
            { id: "ma1", label: "少年", value: "shota, young boy", nsfw: true },
            { id: "ma2", label: "美少年", value: "bishounen, pretty boy" },
            { id: "ma3", label: "青年", value: "young man" },
            { id: "ma4", label: "中年", value: "middle-aged man" },
            { id: "ma5", label: "おじさん", value: "ojisan, older man" },
            { id: "ma6", label: "老人", value: "old man" }
        ],

        male_clothing: [
            { id: "mc1", label: "スーツ", value: "suit, formal" },
            { id: "mc2", label: "タキシード", value: "tuxedo" },
            { id: "mc3", label: "学ラン", value: "gakuran" },
            { id: "mc4", label: "タンクトップ", value: "tank top" },
            { id: "mc5", label: "筋肉シャツ", value: "muscle shirt" },
            { id: "mc6", label: "ジャケット", value: "jacket" },
            { id: "mc7", label: "着物（男性）", value: "male kimono, japanese clothes" },
            { id: "mc8", label: "全裸（男性）", value: "nude, male nude", nsfw: true }
        ],

        body_hair: [
            { id: "mbh1", label: "体毛なし", value: "hairless, smooth" },
            { id: "mbh2", label: "胸毛", value: "chest hair" },
            { id: "mbh3", label: "体毛濃い", value: "hairy, body hair" },
            { id: "mbh4", label: "腹毛", value: "happy trail" },
            { id: "mbh5", label: "脇毛", value: "armpit hair" }
        ],

        genitalia: [
            { id: "mg1", label: "ペニス", value: "penis", nsfw: true },
            { id: "mg2", label: "勃起", value: "erection", nsfw: true, weight: 1.2 },
            { id: "mg3", label: "大きいペニス", value: "large penis", nsfw: true, weight: 1.3 },
            { id: "mg4", label: "巨大ペニス", value: "huge penis", nsfw: true, weight: 1.4 },
            { id: "mg5", label: "睾丸", value: "testicles", nsfw: true },
            { id: "mg6", label: "包茎", value: "foreskin", nsfw: true },
            { id: "mg7", label: "先走り汁", value: "precum", nsfw: true }
        ],

        male_poses: [
            { id: "mp1", label: "力こぶ", value: "flexing, biceps" },
            { id: "mp2", label: "男らしいポーズ", value: "manly pose" },
            { id: "mp3", label: "威圧的", value: "intimidating" },
            { id: "mp4", label: "自信満々", value: "confident" },
            { id: "mp5", label: "ドヤ顔", value: "smug" },
            { id: "mp6", label: "クールな表情", value: "cool expression" }
        ]
    },

    // ==========================================
    // 🔞 NSFW拡張版（Danbooru完全準拠）
    // ==========================================

    // === 基本的な性行為 ===
    sexual_positions: [
        // 基本体位
        { id: "sp1", label: "正常位", value: "missionary", nsfw: true },
        { id: "sp_mp", label: "種付けプレス", value: "mating press", nsfw: true, weight: 1.3 },
        { id: "sp_sm", label: "立位正常位", value: "standing missionary", nsfw: true },
        { id: "sp_lu", label: "足上げ正常位", value: "legs up, missionary", nsfw: true },
        { id: "sp_lh", label: "M字開脚", value: "legs over head, folded", nsfw: true },
        
        // 騎乗位系
        { id: "sp2", label: "騎乗位", value: "cowgirl position", nsfw: true },
        { id: "sp3", label: "逆騎乗位", value: "reverse cowgirl position", nsfw: true },
        { id: "sp_sc", label: "しゃがみ騎乗位", value: "squatting cowgirl position", nsfw: true },
        { id: "sp_us", label: "対面座位", value: "upright straddle", nsfw: true },
        { id: "sp8", label: "アマゾンポジション", value: "amazon position", nsfw: true, weight: 1.2 },
        
        // 後背位系
        { id: "sp4", label: "バック（後背位）", value: "doggystyle, sex from behind", nsfw: true },
        { id: "sp_bo", label: "前かがみバック", value: "bent over, sex from behind", nsfw: true },
        { id: "sp_pb", label: "うつ伏せ体位", value: "prone bone", nsfw: true },
        { id: "sp5", label: "立ちバック", value: "standing sex, sex from behind", nsfw: true },
        { id: "sp_tb", label: "尻上げ体位", value: "top-down bottom-up", nsfw: true, weight: 1.2 },
        
        // 横向き・特殊
        { id: "sp_sp", label: "スプーン体位", value: "spooning", nsfw: true },
        { id: "sp_os", label: "横向き体位", value: "on side", nsfw: true },
        { id: "sp6", label: "69（シックスナイン）", value: "69", nsfw: true },
        { id: "sp_fs", label: "顔面騎乗", value: "facesitting, sitting on face", nsfw: true },
        
        // 拘束・ハード
        { id: "sp_fn", label: "フルネルソン", value: "full nelson", nsfw: true, weight: 1.2 },
        { id: "sp_pin", label: "押し倒し体位", value: "pinning down, mounted", nsfw: true },
        { id: "sp_wh", label: "手首固定", value: "wrist hold, pinning wrists", nsfw: true },
        
        // 複数・特殊
        { id: "sp_sr", label: "串刺し（二穴攻め）", value: "spitroast", nsfw: true, weight: 1.2 },
        { id: "sp_dp", label: "ダブルペネトレーション", value: "double penetration", nsfw: true, weight: 1.3 },
        { id: "sp_gang", label: "輪姦", value: "gangbang", nsfw: true, weight: 1.3 }
    ],

    // === 性行為詳細 ===
    sex_acts: [
        // 手技系
        { id: "sa5", label: "手コキ", value: "handjob", nsfw: true },
        { id: "sa_dh", label: "ダブル手コキ", value: "double handjob", nsfw: true },
        { id: "sa_fin", label: "指入れ", value: "fingering", nsfw: true },
        { id: "sa_fist", label: "フィスティング", value: "fisting", nsfw: true, weight: 1.3 },
        
        // 足技系
        { id: "sa6", label: "足コキ", value: "footjob", nsfw: true },
        { id: "sa_df", label: "ダブル足コキ", value: "double footjob", nsfw: true },
        
        // パイズリ系
        { id: "sa1", label: "パイズリ", value: "paizuri", nsfw: true },
        { id: "sa_cp", label: "協力パイズリ", value: "cooperative paizuri", nsfw: true },
        { id: "sa_sp", label: "跨りパイズリ", value: "straddling paizuri", nsfw: true },
        
        // 口技系
        { id: "sa2", label: "フェラチオ", value: "fellatio", nsfw: true },
        { id: "sa3", label: "ディープスロート", value: "deepthroat", nsfw: true },
        { id: "sa_ir", label: "イラマチオ", value: "irrumatio", nsfw: true },
        { id: "sa_cf", label: "協力フェラ", value: "cooperative fellatio", nsfw: true },
        { id: "sa4", label: "クンニリングス", value: "cunnilingus", nsfw: true },
        { id: "sa_an", label: "アニリングス", value: "anilingus", nsfw: true },

    // ★ 挿入深度系（追加）
    { id: "sa_deep", label: "深い挿入", value: "deep penetration", nsfw: true, weight: 1.3 },
    { id: "sa_balls_deep", label: "根元まで挿入", value: "balls deep", nsfw: true, weight: 1.2 },
    { id: "sa_cervix", label: "子宮口到達", value: "cervix penetration", nsfw: true, weight: 1.4 },
    { id: "sa_womb", label: "子宮内挿入", value: "womb penetration", nsfw: true, weight: 1.5 },
    
    // ★ 強度・激しさ系（追加）
    { id: "sa_rough", label: "激しいセックス", value: "rough sex", nsfw: true, weight: 1.2 },
    { id: "sa_intense", label: "強烈なセックス", value: "intense sex", nsfw: true, weight: 1.2 },
    { id: "sa_vigorous", label: "激しい動き", value: "vigorous sex", nsfw: true, weight: 1.2 },
    { id: "sa_hard", label: "ハードセックス", value: "hard sex", nsfw: true, weight: 1.2 },
        
        
        // その他
        { id: "sa7", label: "素股", value: "grinding, frottage", nsfw: true },
        { id: "sa8", label: "尻コキ", value: "buttjob", nsfw: true },
        { id: "sa_as", label: "脇コキ", value: "armpit sex", nsfw: true },
        { id: "sa_ts", label: "太ももコキ", value: "thigh sex", nsfw: true }
    ],

    // === 射精・絶頂 ===
    cum: [
        // 射精場所
        { id: "cu3", label: "膣内射精", value: "cum in pussy", nsfw: true },
        { id: "cu4", label: "中出し", value: "internal cumshot", nsfw: true },
        { id: "cu_anal", label: "アナル中出し", value: "cum in ass", nsfw: true },
        { id: "cu2", label: "口内射精", value: "cum in mouth", nsfw: true },
        { id: "cu1", label: "顔射", value: "facial", nsfw: true },
        { id: "cu5", label: "胸への射精", value: "cum on breasts", nsfw: true },
        { id: "cu_body", label: "体への射精", value: "cum on body", nsfw: true },
        { id: "cu6", label: "ぶっかけ", value: "bukkake", nsfw: true },
        
        // 射精状態
        { id: "cu7", label: "精液が垂れる", value: "cumdrip", nsfw: true },
        { id: "cu8", label: "過剰な精液", value: "excessive cum", nsfw: true },
        { id: "cu_pool", label: "精液溜まり", value: "cum pool", nsfw: true },
        { id: "cu_cov", label: "精液まみれ", value: "cum covered", nsfw: true },
        
        // 女性の絶頂
        { id: "cu_org", label: "絶頂", value: "orgasm", nsfw: true, weight: 1.2 },
        { id: "cu_sq", label: "潮吹き", value: "squirting, female ejaculation", nsfw: true, weight: 1.2 },
        { id: "cu_conv", label: "痙攣", value: "convulsing", nsfw: true }
    ],

    // === 前戯・愛撫 ===
    foreplay: [
        { id: "fp1", label: "キス", value: "kissing", nsfw: true },
        { id: "fp2", label: "ディープキス", value: "french kissing", nsfw: true },
        { id: "fp3", label: "首筋キス", value: "neck kissing", nsfw: true },
        { id: "fp4", label: "耳舐め", value: "ear licking", nsfw: true },
        { id: "fp5", label: "乳首舐め", value: "nipple licking", nsfw: true },
        { id: "fp6", label: "乳首吸い", value: "nipple sucking", nsfw: true },
        { id: "fp7", label: "乳首責め", value: "nipple play", nsfw: true },
        { id: "fp8", label: "胸揉み", value: "breast grab", nsfw: true },
        { id: "fp9", label: "胸マッサージ", value: "breast massage", nsfw: true },
        { id: "fp10", label: "太もも愛撫", value: "thigh caress", nsfw: true },
        { id: "fp11", label: "尻揉み", value: "ass grab", nsfw: true },
        { id: "fp12", label: "股間愛撫", value: "crotch caress", nsfw: true },
        { id: "fp13", label: "全身愛撫", value: "body caress", nsfw: true }
    ],

    // === 体液・分泌物 ===
    bodily_fluids: [
        { id: "bf1", label: "愛液", value: "pussy juice", nsfw: true },
        { id: "bf2", label: "愛液が垂れる", value: "pussy juice drip", nsfw: true, weight: 1.2 },
        { id: "bf3", label: "愛液が糸を引く", value: "pussy juice trail", nsfw: true, weight: 1.2 },
        { id: "bf4", label: "濡れた股間", value: "wet pussy", nsfw: true },
        { id: "bf5", label: "びしょ濡れ", value: "soaking wet", nsfw: true, weight: 1.2 },
        { id: "bf6", label: "先走り汁", value: "precum", nsfw: true },
        { id: "bf7", label: "よだれ", value: "drooling, saliva", nsfw: true },
        { id: "bf8", label: "汗だく", value: "sweating profusely", nsfw: true },
        { id: "bf9", label: "涙", value: "tears", nsfw: true },
        { id: "bf10", label: "体液まみれ", value: "covered in fluids", nsfw: true, weight: 1.3 }
    ],

    // === 拘束・BDSM ===
    bondage: [
        // 拘束具
        { id: "bo1", label: "腕を縛る", value: "bound arms", nsfw: true },
        { id: "bo2", label: "手首を縛る", value: "bound wrists", nsfw: true },
        { id: "bo3", label: "脚を縛る", value: "bound legs", nsfw: true },
        { id: "bo4", label: "胸を縛る", value: "bound breasts", nsfw: true },
        { id: "bo5", label: "後手縛り", value: "box tie", nsfw: true },
        { id: "bo6", label: "豚縛り", value: "hogtie", nsfw: true },
        { id: "bo7", label: "吊るし", value: "suspension", nsfw: true },
        
        // 道具
        { id: "bo_cuff", label: "手錠", value: "handcuffs", nsfw: true },
        { id: "bo_col", label: "首輪", value: "collar", nsfw: true },
        { id: "bo_gag", label: "口枷", value: "gag", nsfw: true },
        { id: "bo_blind", label: "目隠し", value: "blindfold", nsfw: true },
        { id: "bo_whip", label: "鞭", value: "whip", nsfw: true },
        
        // プレイ
        { id: "bo_span", label: "スパンキング", value: "spanking", nsfw: true },
        { id: "bo_train", label: "調教", value: "training", nsfw: true },
        { id: "bo_pet", label: "ペット化", value: "pet play", nsfw: true }
    ],

    // === おもちゃ・道具 ===
    nsfw_toys: [
        // バイブ系
        { id: "nt1", label: "バイブレーター", value: "vibrator", nsfw: true },
        { id: "nt2", label: "ディルド", value: "dildo", nsfw: true },
        { id: "nt3", label: "電マ", value: "electric massager", nsfw: true },
        { id: "nt4", label: "アナルビーズ", value: "anal beads", nsfw: true },
        { id: "nt5", label: "リモコンバイブ", value: "remote vibrator", nsfw: true },
        { id: "nt6", label: "コックリング", value: "cock ring", nsfw: true },
        { id: "nt7", label: "ニプルクランプ", value: "nipple clamps", nsfw: true },
        { id: "nt8", label: "拘束具", value: "restraints, bondage gear", nsfw: true },
        { id: "nt9", label: "ローター", value: "rotor, egg vibrator", nsfw: true },
        { id: "nt_plug", label: "アナルプラグ", value: "butt plug", nsfw: true },
        { id: "nt_double", label: "ダブルディルド", value: "double dildo", nsfw: true },
        { id: "nt_strap", label: "ストラップオン", value: "strap-on", nsfw: true }
    ],

    // === シチュエーション・コンテキスト ===
    nsfw_context: [
        // 場所・状況
        { id: "nc1", label: "露出プレイ", value: "exhibitionism, public nudity", nsfw: true, weight: 1.2 },
        { id: "nc2", label: "覗き・盗撮", value: "voyeurism, being watched", nsfw: true },
        { id: "nc_out", label: "野外セックス", value: "outdoor sex", nsfw: true },
        { id: "nc_sch", label: "学校でこっそり", value: "school sex", nsfw: true },
        { id: "nc_off", label: "職場でこっそり", value: "office sex", nsfw: true },
        { id: "nc5", label: "ラブホテル", value: "love hotel", nsfw: true },
        
        // 関係性・支配
        { id: "nc3", label: "女攻め・逆レイプ", value: "femdom, dominant female", nsfw: true, weight: 1.2 },
        { id: "nc_male", label: "男攻め・支配", value: "maledom, dominant male", nsfw: true },
        { id: "nc4", label: "ご奉仕プレイ", value: "service, eager to please", nsfw: true },
        { id: "nc9", label: "催眠・洗脳", value: "hypnosis, mind control", nsfw: true, weight: 1.2 },
        { id: "nc10", label: "調教・訓練", value: "training, sexual training", nsfw: true },
        { id: "nc_ntr", label: "寝取られ", value: "netorare, NTR", nsfw: true },
        
        // フェチ
        { id: "nc6", label: "足フェチ", value: "foot fetish, foot focus", nsfw: true },
        { id: "nc7", label: "太ももフェチ", value: "thigh fetish, thigh focus", nsfw: true },
        { id: "nc8", label: "お尻フェチ", value: "ass fetish, ass focus", nsfw: true },
        { id: "nc_tent", label: "触手", value: "tentacles, tentacle sex", nsfw: true, weight: 1.3 }
    ],

    // === 百合・レズビアン ===
    yuri_acts: [
        { id: "ya1", label: "百合", value: "yuri", nsfw: true },
        { id: "ya2", label: "レズビアン", value: "lesbian", nsfw: true },
        { id: "ya3", label: "貝合わせ", value: "tribadism", nsfw: true, weight: 1.2 },
        { id: "ya4", label: "シザリング", value: "scissoring", nsfw: true, weight: 1.2 },
        { id: "ya5", label: "クンニ（百合）", value: "cunnilingus, yuri", nsfw: true },
        { id: "ya6", label: "指入れ（百合）", value: "fingering, yuri", nsfw: true },
        { id: "ya7", label: "胸合わせ", value: "breast press", nsfw: true },
        { id: "ya8", label: "同時イキ", value: "simultaneous orgasm, yuri", nsfw: true }
    ],

    // === やおい・ゲイ ===
    yaoi_acts: [
        { id: "yao1", label: "やおい", value: "yaoi", nsfw: true },
        { id: "yao2", label: "ゲイ", value: "gay", nsfw: true },
        { id: "yao3", label: "アナルセックス（男性）", value: "anal sex, yaoi", nsfw: true, weight: 1.3 },
        { id: "yao4", label: "フェラチオ（男性）", value: "fellatio, yaoi", nsfw: true },
        { id: "yao5", label: "69（男性）", value: "69, yaoi", nsfw: true },
        { id: "yao6", label: "手コキ（相互）", value: "mutual masturbation, yaoi", nsfw: true },
        { id: "yao7", label: "素股（男性）", value: "intercrural sex, yaoi", nsfw: true }
    ],


    // ==========================================
    // ★ Phase 1: NSFW拡張 (Danbooru準拠)
    // ==========================================
    
    // シチュエーション・フェチ
    nsfw_context: [
        { id: "nc1", label: "露出プレイ", value: "exhibitionism, public nudity", nsfw: true, weight: 1.2 },
        { id: "nc2", label: "覗き・盗撮", value: "voyeurism, being watched", nsfw: true },
        { id: "nc3", label: "女攻め・逆レイプ", value: "femdom, dominant female", nsfw: true, weight: 1.2 },
        { id: "nc4", label: "ご奉仕プレイ", value: "service, eager to please", nsfw: true },
        { id: "nc5", label: "ラブホテル", value: "love hotel", nsfw: true },
        { id: "nc6", label: "足フェチ", value: "foot fetish, foot focus", nsfw: true },
        { id: "nc7", label: "太ももフェチ", value: "thigh fetish, thigh focus", nsfw: true },
        { id: "nc8", label: "お尻フェチ", value: "ass fetish, ass focus", nsfw: true },
        { id: "nc9", label: "催眠・洗脳", value: "hypnosis, mind control", nsfw: true, weight: 1.2 },
        { id: "nc10", label: "調教・訓練", value: "training, sexual training", nsfw: true }
    ],

    // オナニー・セルフプレイ
    nsfw_masturbation: [
        { id: "nm1", label: "女性オナニー", value: "masturbation, female masturbation", nsfw: true },
        { id: "nm2", label: "男性オナニー", value: "male masturbation", nsfw: true },
        { id: "nm3", label: "指オナニー（膣）", value: "fingering, pussy fingering", nsfw: true },
        { id: "nm4", label: "指オナニー（アナル）", value: "anal fingering", nsfw: true },
        { id: "nm5", label: "乳首いじり", value: "nipple play, nipple stimulation", nsfw: true },
        { id: "nm6", label: "クリ責め", value: "clit stimulation", nsfw: true },
        { id: "nm7", label: "相互オナニー", value: "mutual masturbation", nsfw: true },
        { id: "nm8", label: "見せ合いオナニー", value: "watching masturbation", nsfw: true }
    ],

    // おもちゃ・道具
    nsfw_toys: [
        { id: "nt1", label: "バイブレーター", value: "vibrator", nsfw: true },
        { id: "nt2", label: "ディルド", value: "dildo", nsfw: true },
        { id: "nt3", label: "電マ", value: "electric massager", nsfw: true },
        { id: "nt4", label: "アナルビーズ", value: "anal beads", nsfw: true },
        { id: "nt5", label: "リモコンバイブ", value: "remote vibrator", nsfw: true },
        { id: "nt6", label: "コックリング", value: "cock ring", nsfw: true },
        { id: "nt7", label: "ニプルクランプ", value: "nipple clamps", nsfw: true },
        { id: "nt8", label: "拘束具", value: "restraints, bondage gear", nsfw: true },
        { id: "nt9", label: "ローター", value: "rotor, egg vibrator", nsfw: true }
    ],

    // 体液・マーキング
    nsfw_fluids: [
        { id: "nf1", label: "中出し", value: "creampie, internal cumshot", nsfw: true, weight: 1.3 },
        { id: "nf2", label: "大量射精", value: "excessive cum", nsfw: true, weight: 1.2 },
        { id: "nf3", label: "精液まみれ", value: "cum covered", nsfw: true },
        { id: "nf4", label: "愛液垂れ", value: "pussy juice drip", nsfw: true },
        { id: "nf5", label: "潮吹き", value: "squirting, female ejaculation", nsfw: true, weight: 1.2 },
        { id: "nf6", label: "よだれ", value: "drooling, saliva", nsfw: true },
        { id: "nf7", label: "ボディペイント", value: "body writing", nsfw: true },
        { id: "nf8", label: "キスマーク", value: "hickey, love bite", nsfw: true },
        { id: "nf9", label: "汗だく", value: "sweating, sweaty", nsfw: true },
        { id: "nf10", label: "オイル・ローション", value: "oiled body, lotion", nsfw: true }
    ],

    // 高度なタグ（上級者向け）
    nsfw_advanced: [
        { id: "na1", label: "断面図", value: "cross-section, x-ray", nsfw: true, weight: 1.3 },
        { id: "na2", label: "触手", value: "tentacles, tentacle sex", nsfw: true, weight: 1.3 },
        { id: "na3", label: "ふたなり", value: "futanari", nsfw: true, weight: 1.2 },
        { id: "na4", label: "異種姦", value: "monster sex, interspecies", nsfw: true, weight: 1.2 },
        { id: "na5", label: "妊娠", value: "pregnant", nsfw: true },
        { id: "na6", label: "産卵", value: "egg laying, oviposition", nsfw: true, weight: 1.3 }
    ],

    // ==========================================
    // ★ Phase 2-6: 質感・生理現象（最重要）
    // ==========================================
    physiology: [
        { id: "phy1", label: "大量の汗", value: "heavy sweating, sweat drop", nsfw: true, weight: 1.2 },
        { id: "phy2", label: "荒い息・蒸気", value: "heavy breathing, steam", nsfw: true, weight: 1.1 },
        { id: "phy3", label: "全身紅潮", value: "flushed skin, red skin", nsfw: true, weight: 1.2 },
        { id: "phy4", label: "よだれ・垂れ", value: "drooling, saliva trail", nsfw: true, weight: 1.2 },
        { id: "phy5", label: "身体の震え", value: "trembling, shaking", nsfw: true },
        { id: "phy6", label: "白目", value: "rolling eyes", nsfw: true, weight: 1.3 },
        { id: "phy7", label: "お腹の膨らみ", value: "stomach bulge", nsfw: true, weight: 1.3 },
        { id: "phy8", label: "鳥肌", value: "goosebumps", nsfw: true },
        { id: "phy9", label: "愛液が糸を引く", value: "pussy juice trail, dripping", nsfw: true, weight: 1.3 },
        { id: "phy10", label: "濡れた太もも", value: "wet thighs", nsfw: true }
    ],

    // ==========================================
    // ★ Phase 3: 着衣の乱れ（破壊力大）
    // ==========================================
    clothing_disarray: [
        { id: "cd1", label: "服をたくし上げ", value: "clothes lift, shirt lift", nsfw: true },
        { id: "cd2", label: "服をずらす・引っ張る", value: "clothes pull, panty pull", nsfw: true },
        { id: "cd3", label: "片方だけ脱ぐ", value: "partially undressed, asymmetrical clothes", nsfw: true },
        { id: "cd4", label: "服がはだける", value: "open clothes, disheveled", nsfw: true },
        { id: "cd5", label: "下着が見える", value: "underwear peek, panty peek", nsfw: true },
        { id: "cd6", label: "足首にパンツ", value: "panties around ankles", nsfw: true },
        { id: "cd7", label: "髪の乱れ", value: "messy hair, disheveled hair", nsfw: true, weight: 1.2 },
        { id: "cd8", label: "濡れて透ける", value: "wet clothes, see-through", nsfw: true, weight: 1.3 }
    ],

    // ==========================================
    // ★ Phase 4: エロ特化カメラアングル
    // ==========================================
    erotic_camera: [
        { id: "ec1", label: "股間アップ", value: "crotch focus, close-up", nsfw: true, weight: 1.4 },
        { id: "ec2", label: "胸アップ", value: "breast focus, close-up", nsfw: true, weight: 1.3 },
        { id: "ec3", label: "尻アップ", value: "ass focus, close-up", nsfw: true, weight: 1.3 },
        { id: "ec4", label: "下から見上げる", value: "from below, upskirt view", nsfw: true, weight: 1.3 },
        { id: "ec5", label: "主観視点（POV）", value: "pov, first-person view", nsfw: true, weight: 1.2 },
        { id: "ec6", label: "股の間から", value: "between legs view", nsfw: true, weight: 1.4 },
        { id: "ec7", label: "鏡越し", value: "mirror view, reflection", nsfw: true },
        { id: "ec8", label: "断面図", value: "cross-section, x-ray", nsfw: true, weight: 1.4 }
    ],

    // ==========================================
    // ★ Phase 5: 表情の「ガチ度」強化
    // ==========================================
    intense_expressions: [
        { id: "ie1", label: "恍惚の表情", value: "ecstasy, blissful expression", nsfw: true, weight: 1.3 },
        { id: "ie2", label: "とろけ顔", value: "melting face, pleasure", nsfw: true, weight: 1.2 },
        { id: "ie3", label: "涙目で感じる", value: "teary eyes, pleasure", nsfw: true },
        { id: "ie4", label: "舌を出して喘ぐ", value: "tongue out, panting", nsfw: true, weight: 1.2 },
        { id: "ie5", label: "目を見開いて絶頂", value: "wide-eyed, climax", nsfw: true, weight: 1.3 },
        { id: "ie6", label: "虚ろな目（事後）", value: "empty eyes, afterglow", nsfw: true, weight: 1.2 },
        { id: "ie7", label: "唇を噛む", value: "biting lip, aroused", nsfw: true },
        { id: "ie8", label: "息切れ", value: "out of breath, panting heavily", nsfw: true }
    ],

    // ==========================================
    // ★ Phase 6: 事後・余韻
    // ==========================================
    aftermath: [
        { id: "af1", label: "事後", value: "after sex, post-coital", nsfw: true },
        { id: "af2", label: "ぐったり", value: "exhausted, lying limply", nsfw: true },
        { id: "af3", label: "ベッドの乱れ", value: "messy bed, rumpled sheets", nsfw: true },
        { id: "af4", label: "汗だく", value: "sweaty, glistening skin", nsfw: true },
        { id: "af5", label: "満足そう", value: "satisfied expression", nsfw: true },
        { id: "af6", label: "体液まみれ", value: "covered in fluids", nsfw: true, weight: 1.3 }
    ],

    camera: [
        { id: "cam1", label: "正面", value: "straight-on" },
        { id: "cam2", label: "上から（俯瞰）", value: "from above" },
        { id: "cam3", label: "下から（アオリ）", value: "from below" },
        { id: "cam4", label: "横から", value: "from side, profile" },
        { id: "cam5", label: "斜め構図", value: "dutch angle" },
        { id: "cam6", label: "クローズアップ", value: "close-up" },
        { id: "cam7", label: "上半身", value: "upper body" },
        { id: "cam8", label: "全身", value: "full body" },
        { id: "cam9", label: "股間視点", value: "pov crotch", nsfw: true }
    ],

    background: [
        { id: "bg1", label: "シンプル背景", value: "simple background" },
        { id: "bg2", label: "白背景", value: "white background" },
        { id: "bg3", label: "寝室", value: "bedroom, bed" },
        { id: "bg4", label: "教室", value: "classroom" },
        { id: "bg5", label: "屋外", value: "outdoors" },
        { id: "bg6", label: "ビーチ", value: "beach, ocean" },
        { id: "bg7", label: "ファンタジー", value: "fantasy background" }
    ],

    lighting: [
        { id: "l1", label: "自然光", value: "natural lighting" },
        { id: "l2", label: "映画的照明", value: "cinematic lighting" },
        { id: "l3", label: "リムライト", value: "rim light" },
        { id: "l4", label: "逆光", value: "backlit" },
        { id: "l5", label: "ボリュメトリックライト", value: "volumetric lighting" },
        { id: "l6", label: "被写界深度", value: "depth of field, bokeh" },
        { id: "l7", label: "詳細な瞳", value: "detailed eyes" },
        { id: "l8", label: "詳細な髪", value: "detailed hair" }
    ],

    negative: {
        // Crody氏（Team-C）推奨ネガティブプロンプト
        base: "modern, recent, old, oldest, cartoon, graphic, text, painting, crayon, graphite, abstract, glitch, deformed, mutated, ugly, disfigured, long body, lowres, bad anatomy, bad hands, missing fingers, extra fingers, extra digits, fewer digits, cropped, very displeasing, (worst quality, bad quality:1.2), sketch, jpeg artifacts, signature, watermark, username, simple background, conjoined, bad ai-generated",
        
        // NSFW対応（既存機能維持）
        nsfw_safe: "censored, bar_censor, mosaic_censor"
    }
};






