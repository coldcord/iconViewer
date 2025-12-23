/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import * as t from "./types";

// name: pattern
export const iconsFinds: Record<string, string> = {
    Discord: "1.6 5.64-2.87",
    XboxNeutral: "8.68-.62c.89-.81 1.5",
    PlaystationNeutral: "2.04Zm-9.35",
    TwitterNeutral: "M13.86 10.47", // even discord calls it twitter lmao
    InstagramNeutral: "4.12.07Zm.1 2c-",
    YoutubeNeutral: "11.5s0 3.95.5 5.85a3.",
    FacebookNeutral: "2.8V12h2.8V9",
    NintendoSwitchNeutral: "14V2.32c0",
    Pencil: "0-2.82 0l-1.38 1.38a1",
    AngleBrackets: "0-.4.8v1.98c0",
    NitroWheel: "12c0-1.29.95",
    Bill: "75.34.75.75C6 7.99 5 9",
    Chat: "2.2 22H12Z\",",
    ChatVoice: "22H12Zm2-5.26c0",
    ChatX: ".23.46-.48.47L12 22H2.",
    ChatSmile: "04-.61A10 10 0 1 1 22 ",
    ChatRetry: "14.07.3.09.44.04a7",
    ChatPlus: "1.24-.37V12a10 10 0 1 ",
    Bug: "1.1.27.1.37 0a6.66 6.6",
    B: "9V2.9c0-.5.4-.9.9-.9h7",
    Eye: "19.1 21 12 21c-7.11 0-",
    EyeSlash: "2.63-2.63c",
    EyePlus: "3.32ZM19 14a1 ",
    Heart: "0C9.43 20.48 1 15.09 1",
    Star: ".73-2.25h6.12l1.9-5.83Z",
    StarOutline: "3.1h5.26l1.62",
    StarShooting: "1.35l2.95 2.14",
    QrCode: "0v3ZM20",
    Friends: "12h1a8",
    PlusSmall: "0v-5h5a1",
    Pin: "1-.06-.63L6.16",
    PinUpright: "5H8v4.35l-3.39",
    PinUprightSlash: "1.56ZM11.08 ",
    ArrowsLeftRight: "18.58V3a1",
    XSmall: "13.42l5.3",
    XLarge: "13.42l7.3 7.3Z",
    XSmallBold: "12l4.94-4.94a1.5",
    XLargeBold: "12l6.94-6.94a1.5",
    Lock: "3Zm9-3v3H9V6a3",
    LockUnlocked: "1-1.33-1.5ZM14",
    Video: "1.45-.9V7.62a1",
    VideoSlash: "1.4l20-20ZM9.2",
    VideoLock: "1.32-.5V7.62a1",
    Fire: "14Zm9.26-.84a.57.57",
    Warning: "3.15H3.29c-1.74",
    Download: "1.42l3.3 3.3V3a1",
    Upload: "0ZM3 20a1 1",
    // QuestionMark: "0ZM5.5 7a1.5" Unknown name
    Quest: "10.47a.76.76",
    Play: "4.96v14.08c0",
    Emoji: " 0 0 0 0 22ZM6.5",
    Gif: "3H5Zm2.18 13.8",
    Trash: "2.81h8.36a3",
    Bell: "9.5v2.09c0",
    Screen: "0-3-3H5ZM13.5",
    ScreenArrow: "3V5Zm16",
    ScreenStream: " 2-2h3a2",
    ScreenSystemRequirements: "3V5Zm3", // a guess
    ScreenSlash: "5.8ZM17.15",
    ScreenX: "1-3-3V5Zm6.3.3a1",
    Plus: "0v8H3a1 1 0 1 0 0 2h8v8a1",
    Id: "15h2.04V7.34H6V17Zm4",
    Tv: "0-3-3H4ZM6 20a1",
    Crown: "1.18l.82.82-3.61",
    React: "04-4ZM16.96 4.08c",
    Camera: "1.34 1.71 1.34H20a3",
    Sticker: "1-.58.82l-4.24",
    StageLock: "7.14-3.85ZM18.98",
    Stage: "20.03c-.25.72.12",
    ConnectionFine: "1 0 1 1-2 0A17 17 ",
    ConnectionAverage: "\"M3 7a1 1 0 0",
    ConnectionBad: "\"M2 13a1 1 0 0",
    ConnectionUnknown: "15.86-.6.9-.2.02",
    ChatWarning: ".54.5H2.2a1",
    ChatCheck: "22H12c.22",
    Hammer: "1.42ZM7.76",
    StickerSmall: "1-.5.5H7a4",
    MagnifyingGlassPlus: "M11 7a1 1 0",
    MagnifyingGlassMinus: "1 0 2H7a1",
    // MagnifyingGlass Icon is difficult to match (1.41-1.41l4.68 4.67a1)
    ChatArrowRight: "2.43l.06",
    Bookmark: "1-1.67.74l",
    ChannelList: "1-1-1ZM2 8a1",
    ChannelListMagnifyingGlass: "2h18a1 1 0 1 0 0-2H3ZM2",
    Activities: "1h3a3 3 0 0 0 3-3Z\"",
    ActivitiesPlus: "14.35v1.29a",
    AnnouncementsLock: "1-2.46-1.28 3.86",
    AnnouncementsWarning: "1-2.46-1.28 3.85",
    Announcements: ".42.27.79.62",
    ShieldLock: "1l.6-4.65c.05-.17-.0",
    ShieldUser: "1.33 0a40.17 40",
    ShieldAt: ".2.28.33.19.57.",
    Shield: "1-.68-.12-.49-.", // a guess
    Slash: "1-.43-.76L15.78",
    SlashBox: "0-3-3H5Zm12.79",
    Apps: "2.95H20a2 2 0",
    CheckmarkLarge: "1.4l-12 12a1",
    CheckmarkLargeBold: "2.12-2.12L9",
    CheckmarkSmallBold: "13.88l6.94-6.94a1.5",
    CheckmarkSmall: "1-1.4 0l-4-4a1",
    DoubleCheckmark: "1.4l4.5 4.5a1",
    NewUser: "0-.92h-.03a2", // a guess
    UserCheck: "0l1.8-1.8c.17",
    User: "2.9.06.24.26.",
    UserMinus: "3-3h5.02c.38",
    UserPlus: "2.07ZM12",
    UserPlay: " 1 3.65-8.61c.4-.2.4",
    UserBox: "0-3-3H5Zm10 6a3", // a guess
    Settings: "0ZM16 12a4",
    SettingsInfo: "10Zm1-4a1",
    Hashtag: "8 4.84a1", // a guess
    HashtagLocked: "2.02.31.03", // a guess
    HashtagWarning: "8h1.26Z", // a guess
    HashtagPlay: "52.88H9.85l", // a guess
    Flag: "5.85v7.3a2",
    Language: "5.43h3.85l",
    Lightbulb: "8.5ZM15.1 19c.5",
    Key: "23-.24ZM10 16a2",
    InBox: "3H5ZM4 5.5C4",
    BookmarkOutline: "0-1-1ZM7 2a3",
    Food: "7.58V8a1 1",
    //
    Robot: "06.03-.",
    GlobeEarth: "25.25H13a3",
    Burger: "1.13-.76Zm", // Unknown name, named burger for now
    Spotify: ".25.53.78.28",
    Home: "0l8.39 6.45a2",
    Orb: "-.64l7.48", // new icon
    Keyboard: "28.22.5.5.5h1a",
    NewUserSimple: "93-.94h-2.24a5.6",
    Apple: "2.54A12.25 12.25",
    // Steam: "2.94v.05l-2.62",
    HeadphonesSlash: "04-.25l3.48-3.48Z",
    //
    Headphones: "4.1-2.13h1.86A9",
    HeadphonesDeny: "2.13h1.86c.03",
    Microphone: "7.94V20H9a1",
    MicrophoneDeny: ".63.32.51.65A8",
    ExperimentalMicrophoneSparkle: "1.18L6.14.79a1.21",
    ExperimentalMicrophoneSparkleSlash: "1.18l1.38.51Z", // name guess
    ExperimentalPineappleHouse: "1.41-1.14Zm",
    Eyedropper: "4.4a4.57",
    Badge: ".44.5.49a3.14",
    Tag: "88-2.12V4a2",
    // Attachment mostly guesses (or papers? idk)
    File: "5.22.5.5V18a4",
    FileWarning: "1.48Zm3.93-4.47a",
    FileDeny: "\"M21.76 14.83a", // name guess
    Bicycle: "10h4.48l.55",
    At: "33h1.02Zm",
    BookCheck: "3v12H5.5a1.5 1.5",
    BrowserLink: "1.41l2.52-2.52a5.98", // name guess
    Sun: "1.42ZM23", // name guess
    //
    Thread: "1.3-.12l9.54 6.72a1",
    ThreadPlus: "1.34-.32ZM15.82",
    ThreadWarning: "M18.09 15.63c.4",
    // ThreadLock, couldn't find a unique pattern
    VoiceNormal: "1-1V3ZM15.1 20.75c",
    VoiceX: "1.42L20.42 12l2.3-2.3a1",
    VoiceLow: "1-1V3ZM15.18 15.36c",
    Compass: "7.75l7.22-1.45a1",
    Gift: "8H16Zm-5.89-2.42.6",
    PlusMid: "0v6H5a1",
    ExperimentalLootbox: ".98-1.18c.87", // a guess
    Location: "9-8.03 9-13a9",
    Phone: "1-3-3V4Zm5",
    //
    PaintPalette: "2v2c0 1.66-1.37",
    PaintbrushIcon: "13l4.91-8.05a1.",
    Treat: "1.21c1.08.57.68 2.21-.55",
    MagicWand: "27 2.27.85c.48.",
    ThreadLock: "{fillRule:\"evenodd\",d:\"M16",
    CoffeeCup: "45 0 0 0-.2.4 1",
    ArrowRight: ".48 0 0 0 0-2.6",
    Lamp: "h4.18a1.41 1.41", // a guess
    BellZ: "M19 11.5a.5.5 0",
    BellSlash: "20 20ZM3.13 16.",
    Music: "3 3.5 3S8 17.66",
    MusicSlash: "0 0 1 2.65-1.89",
    Paperclip: "57 4.01a6.97 6.",
    Envelope: "0 0 0 3-3V8.8Z\"",
    Snowflake: ".88A1 1 0 1 1 5",
    Ticket: "9-.7Zm2.75 2.75",
    Leaf: "26-1-1.85-.42-1",
    MicrophoneArrowRight: "1 0 1.4l-4 4a1 ",
    PawPrint: ".68-3.95.79-1.0",
    GameController: "23-.55c-.57.13-",
    GameControllerLink: "6 6.06a1 1 0 0 ",
    MicrophoneSlash: "3.83l-.02.02A5.",
    Pause: "6ZM15 4a1 1 0 0",
    Cloud: " 0 0 1 5 5v.2A5",
    CloudCheck: ".05-4.78-4.65-4.96zM",
    Cloud2: "4.78-4.65-4.96z\"}),(",
    Skull: ".58 1.2-.05.19-",
    PlayStationNeutral2: ".4035 13.3058 1",
    SpotifyNeutral2: "8,9.37785148 C1",
    XboxNeutral2: "29146,3.3252989",
    AppleNeutral2: "2.396-2.48 4.06",
    TikTokNeutral: "2.893 2.893 0 0",
    YoutubeNeutral2: "1 24 12.0545 24 12.0",
    CrunchyrollNeutral: "6 9.64c-.03.06-.05 0",
    OsWindows: "094L20.105 3zM4",
    LaptopPhone: "8H2a1 1 0 1 0 0",
    UserShield: "6 12.1294V12.70",
    UserClock: "1 11.53 11h.94c",
    Backpack: "6.35 11H7V9a1 1",
    Hourglass: "-2.06 2.06A6 6 ",
    CirclePlus: "1 1 0 2h-4v4a1 ",
    CircleQuestion: "27l-.28-2a1 1 0",
    CircleCheck: "0 0-1.4-1.4L10 ",
    CirclePlay: "c0-.88 1-1.4 1.73-.9",
    CirclePlusPlay: "1 12.665c-.923-",
    CircleInformation: "2-.79l1.05-4.86",
    CircleWarning: "12 0l-.38-6.94a",
    CircleX: "42L13.42 12l3.3-3.3a",
    EmojiMinus: ".59-9.05 9.33 9.33 0",
    EmojiPlus: "l.06.02h.02A1 1",
    EmojiSad: ".5 12C17.3284 1",
    EmojiSparkle: " 0 0 22.47 8.6a2.93 ",
    Clock: " 0v7c0 .27.1.52",
    Train: "3 3h-.13l.96 1.",
    ThumbsDown: " 1-.08.24l-.54.33a1.",
    ThumbsDown2: "868 10.2225 13.087 1",
    ThumbsUp: "9a1.92 1.92 0 0 0-1.",
    ThumbsUp2: "18 16.5424 14.7841C1",
    Potion: ".33.47a7 7 0 0 ",
    Dots: "1 0 4Zm0 8a2 2 ",
    Trophy: "2 0 0 1-2 2H8Zm9.29-",
    Thunder: " 0 0-.66-1.75h-4.81a",
    Disc: "-1.29-1.26-.21-.82.0",
    Car: " 0 0 1 1.94 1.51ZM10",
    StickerSad: "5.82 0 1 1 0 0 0 1.6",
    FileUp: ".5v2.3a.4.4 0 0 1-.6",
    Forum: "-9 3.58-9 8c0 1.5.47",
    ForumLock: "V5c0-.66.22-1.28.58-",
    ForumWarning: "-.51.25-.8a2.86 2.86",
    Timer: "l-.67.68A8.96 8.96 0",
    Shop: "-3 3h-2.75a.25.25 0 ",
    ShopSparkle: "a.28.28 0 0 0-.4 0 4",
    HeartOutline: " 5 0 0 0-3.85 1.69L1",
    HandRequestSpeakList: "0 0 0 .43-.48v-2.59L",
    PiggyBank: "55L20.5 16h.5a2 2 0 ",
    WiltedRose: "6.26 0 0 0-.3-.13Z\",",
    GlobalEarthLocked: "46c-.95-.3-1.95-.46-",
    Door: "3v7.5a.5.5 0 0 1-.5",
    DoorEnter: "M9 10a1 1 0 0 1 1 1v",
    DoorExit: ",d:\"M15.3 16.7a1 1 0",
    UserCircle: "1-1.46.9 10.95 10.95",
    UserCircleStatus: "1a.4.4 0 0 1 .38.27c",
    Group: "67 1.5-1.5a7.5 7.5 0",
    GroupPlus: "-.47-1.63.11-.27.2-.",
    GroupArrowDown: "1.42 1.42l1.85 1.84 ",
    ImageLock: " 5.81 19H13v3H5a3 3 ",
    ImagePlus: "6.22-.48.06l-.47-.63",
    ImageSparkle: "5 1.38a3.22 3.22 0 0",
    Images: "76 1.32-1.33.76a.8.8",
    Image: "3V5Zm13.35 8.13 3.5 ",
    ImageFileUp: "2 0l.55.73.98-.98a3 ",
    ImageFile: "0 0 4-4v-7.5a.5.5 0 ",
    ImageWarning: ".12.9.26.9 1.54 0 1.",
    ClockWarning: "-.73-.3-.97l-3-3A1 1",
    ClockX: ".42 19l2.3 2.3a1 1 0",
    UnknownGame: ".4987V9.9987C19.1667", // a guess
    Replay: ".38.7-.54 1.32-1.16 ", // a guess
    Retry: "-2 0v3a9.98 9.98 0 0",
    HandRequestSpeak: " 0 0 14.28.03l.95-3.", // a guess
    HandRequestSpeakDeny: "89a7.47 7.47 0 0 1-7", // a guess
    SadPoop: "106.1-18.5 c3.1-1.3,",
    PhoneHangUp: " 1-.32-6.92 12.67 12",
    PhoneCall: "a1 1 0 0 1 1-1 8 8 0",
    PencilSparkle: ".15-.38.45-.68.83-.8",
    Deny: " 7.03L19.03 6.38A8.9",
    CircleOutline: "03 6.38A8.96 8.96 0 ", // a guess
    ExperimentalConfetti: "0 0 1 .35 1.06l-.06.", // a guess
    AppsPlus: "3 0 0 1-3-3V5ZM2 16a",
    Folder: " 1 1.66.9L12 5h7a3 3",
    FolderPlus: " 0 1-2 0v-3H8a1 1 0 ",
    Sparkle: " 0 3.18 0l.85-2.27a2",
    MobilePhoneController: " 1 0 0 0-1-1H8a1 1 0",
    UserController: ".58.32a19.22 19.22 0",
    CreditCard: "6a3 3 0 0 1 3 3v1H1V",
    FlagCheck: " 0 0 0-1.48 1.48l2.1",
    GridSquare: "-1.46 3.25-3.25v-2.5", // a guess
    Minus: "width:\"8\",height:\"2\",x:\"2\",y:\"5\"", // all I'm gonna say.. interesting (pretty breakable)
    Party: "1 0 0 0-1.21-.73l-4 ",
    Clipboard: " 0 0 1-1-1Zm0 4a1 1 ",
    ClipboardCheck: "\"M17 5.5V6a1 1 0 0 1",
    Menu: "2a1 1 0 1 0 0-2H9Z\",", // a guess
    Boost: "0.88l-4.68-3.83C7.25",
    BoostSlash: ".44-1.57-1.51a1.02 1",
    BoostTier1: "C7.25 7.01 7 7.35 7 ", // a guess
    BoostTier1Simple: ".73l3.98 3.86a1 1 0 ", // a guess
    BoostTier2: "-.54-.3-.73l-4-3.9a1", // a guess
    BoostTier2Simple: ".06 1.05-2.6l4.9-4Z\"", // a guess
    BoostTier3: " 0l-2.36-2.36a1 1 0 ", // a guess (check if this isn't the simple version)
    BoostTier3Simple: ".18 1.19l.51 1.38c.1", // a guess
    Receipt: " 0 0 0-1.27-.97l-2.5", // a guess
    Paper: "Zm1 4a1 1 0 1 0 0 2h",
    PaperPlus: " 0 0 3 3h9c.1 0 .12-",
    ClassicGameController: ".55l.9 4.72h3.34a2 2", // a guess
    Summary: " .3.82H6v-.83c0-.29-",
    Swords: ".53.53a1 1 0 0 1 .29", // new
    Clapperboard: "0 1-3-3v-8.5ZM5 14a1", // new
    Files: "6 6v5.5a.5.5 0 0 1-.", // new?
    AngrySign: "0 1 3.4 5.92 5.95 5.", // new
    Ear: "0 0 22 18a1 1 0 1 0-", // new
    EarSlash: ".33.11.4.53.16.78l-.", // new
    Tools: "l-1.58 1.58a1 1 0 0 ", // new?
    Speedometer: "83-13.8a1 1 0 0 0-1.",
    Wrench: "1-1v-3.27c0-.82.5-1.",
    TriangularGlassBottle: "v6.49a2 2 0 0 1-.5 1", // new?
    Tower: ".41 15H9v1.59Zm4-.59", // new
    VideoClip: "a.5.5 0 0 0-.4-.8h-4",
    Embed: "1h6a1 1 0 1 1 0 2H6a",
    Minimize: "a1 1 0 1 0 0-2h-3a4 ", // a guess
    Maximize: "0 2 0V6a4 4 0 0 0-4-", // a guess
    ArrowsOppositeDirections: "1 1-2 0V5.41l-5.3 5.", // a guess
    XLarge2: "1 6 6.583 1.576 11 1",
    Waveform: "-2 0V6ZM1 8a1 1 0 0 ", // a guess
    Town: "M7.36 10.23a1 1 0 0 ", // new?
    SwimmingGoggles: ".83 1.2 1.2 0 0 0-1.", // new?
    SmallX2: ".5 L6,6 L8.5,8.5 L6,",
    CrescentMoon: "46l-1.2.45-.45 1.2a.", // new? is this even the correct name?
    NavigateSign: ".3.07.4.2l2.63 3.5a.", // new? does this name fit
    Calendar: " 1 1 1v9a3 3 0 0 1-3",
    SkipForward: "-2.18-.02a1.1 1.1 0 ", // new
    SkipBackward: "19l-.02.02a11.47 11.", // new
    GloryMountain: "ZM2.76 9.47a1 1 0 1 ", // new?
    SettingsCircle: "87-.12 1.14.24.7.95 ", // a guess
    Branches: " 1 0-2 0V11H8a4 4 0 ", // new?
    MoneyExchange: "1.1 1.1 0 0 1 .18.06", // new?
    LineGraph: "2 0V7a1 1 0 0 0-1-1h", // new
    CodeBadge: "44 5.33333L5.33333 7", // UIC
    Expand: "8 3H16a1 1 0 0 1-1-1", // a guess
    SoftSquareOutline: "375C4.06519 3 3 4.06",
    SquareOutline: ":\"1.5\",y:\"1.5\",fill:", // pretty breakable
    Poll: "12a2 2 0 1 0 0-4H4Z\""
};


//   "ImageText",pencil
// 1.4a1.59

// 13l4.91-8.05a1.8
// 82.58l4.24
// 7 1.43-.7 1.82 0l3.96 6.9c.38.66-.12 1.47-.91 1.47h-7.92c
// M12 2.81a1 1 0 0 1 0-1.41l.36-.36a1

export const namePatterns = new Map(Object.entries(iconsFinds));
export function getNameByIcon(Icon: t.Icon, defaultName: any) {
    // TODO: add map of icons -> name for debugging purposes
    for (const [name, pattern] of namePatterns) {
        if (String(Icon).includes(pattern)) {
            namePatterns.delete(name); // remove pattern from map after being found prevent overshadowing
            return name;
        }
    }
    return defaultName;
}
