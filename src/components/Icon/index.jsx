import {
  Check,
  Copy01,
  Download01,
  Edit03,
  Link04,
  LinkExternal01,
  Menu01,
  Placeholder,
  Target04,
  Target05,
  XClose,
  CheckCircle,
  SearchSm,
  SearchMd,
  SearchLg,
  CheckCircleFilled,
  DotsGrid,
  HeartHand
} from "./variants/General";
import {
  ArrowLeft,
  ArrowNarrowRight,
  ArrowRight,
  ArrowSquareUpRight,
  ChevronDown,
  ChevronRight,
  ChevronUp,
} from "./variants/Arrows";
import { MoonStar, Stars02, Sun } from "./variants/Weather";
import {
  Discord,
  Facebook,
  GitHub,
  LinkedIn,
  Medium,
  Reddit,
  Telegram,
  Twitter,
  YouTube,
} from "./variants/Socials/White";
import { 
  Medium as MediumDefault, 
  YouTube as YouTubeDefault, 
  Github as GithubDefault, 
  Reddit as RedditDefault, 
  Twitter as TwitterDefault, 
  Discord as DiscordDefault, 
  Telegram as TelegramDefault, 
  Linkedin as LinkedinDefault,
  Facebook as FacebookDefault
} from './variants/Socials/Default'
import { CodeSquare01, Database01, FileCode01 } from "./variants/Development";
import { Bell02 } from "./variants/AlertsAndFeedback";
import { ChartBreakoutSquare, LineChartUp03 } from "./variants/Charts";
import { Cube01, Cube02 } from "./variants/Shapes";
import { BookClosed, Glasses02 } from "./variants/Education";
import { Lightbulb03, Phone01, Play, Rss01 } from "./variants/MediaDevices";
import { Clock } from "./variants/Time";
import { Flag06, MarkerPin01, Globe01, MarkerPin02 } from "./variants/MapsAndTravel";
import { FaceSmile, Users01, UserSquare } from "./variants/Users";

// custom icons
import MoonStarFilled from "./variants/moon-star-filled";
import SunFilled from "./variants/sun-filled";
import Dot from "./variants/dot"
import { Folder, FolderPlus } from "./variants/Files";
import { Bank } from "./variants/FinanceAndEcommerce";
import { ShieldTick } from "./variants/Security";
import { AnnotationDots, Mail02, MessageDotsCircle } from "./variants/Communication";
import { PencilLine } from "./variants/Editor"
import { Arbitrum, ArbitrumDark, Avalanche, AvalancheDark, BNBChain, BNBChainDark, Ethereum, EthereumDark, Polygon, PolygonDark } from "./variants/Brands";

export const Icon = ({ size, variant }) => {
  let IconComponent = null;

  // custom icon
  if (variant === "moon-star-filled") {
    IconComponent = MoonStarFilled;
  }

  // custom icon
  if (variant === "sun-filled") {
    IconComponent = SunFilled;
  }

  if (variant === "placeholder") {
    IconComponent = Placeholder;
  }

  if (variant === "arrow-narrow-right") {
    IconComponent = ArrowNarrowRight;
  }

  if (variant === "arrow-right") {
    IconComponent = ArrowRight;
  }

  if (variant === "arrow-left") {
    IconComponent = ArrowLeft;
  }

  if (variant === "moon-star") {
    IconComponent = MoonStar;
  }

  if (variant === "sun") {
    IconComponent = Sun;
  }

  if (variant === "link-external-01") {
    IconComponent = LinkExternal01;
  }

  if (variant === "x-close") {
    IconComponent = XClose;
  }

  if (variant === "menu-01") {
    IconComponent = Menu01;
  }

  if (variant === "discord") {
    IconComponent = Discord;
  }

  if (variant === "twitter") {
    IconComponent = Twitter;
  }

  if (variant === "telegram") {
    IconComponent = Telegram;
  }

  if (variant === "github") {
    IconComponent = GitHub;
  }

  if (variant === "linkedin") {
    IconComponent = LinkedIn;
  }

  if (variant === "medium") {
    IconComponent = Medium;
  }

  if (variant === "youtube") {
    IconComponent = YouTube;
  }

  if (variant === "reddit") {
    IconComponent = Reddit;
  }
  
  if (variant === "discord-default") {
    IconComponent = DiscordDefault;
  }

  if (variant === "twitter-default") {
    IconComponent = TwitterDefault;
  }

  if (variant === "telegram-default") {
    IconComponent = TelegramDefault;
  }

  if (variant === "github-default") {
    IconComponent = GithubDefault;
  }

  if (variant === "linkedin-default") {
    IconComponent = LinkedinDefault;
  }

  if (variant === "medium-default") {
    IconComponent = MediumDefault;
  }

  if (variant === "youtube-default") {
    IconComponent = YouTubeDefault;
  }

  if (variant === "reddit-default") {
    IconComponent = RedditDefault;
  }

  if (variant === "facebook-default") {
    IconComponent = FacebookDefault;
  }

  if (variant === "code-square-one") {
    IconComponent = CodeSquare01;
  }

  if (variant === "bell-02") {
    IconComponent = Bell02;
  }

  if (variant === "chart-breakout-square") {
    IconComponent = ChartBreakoutSquare;
  }

  if (variant === "cube-02") {
    IconComponent = Cube02;
  }

  if (variant === "cube-01") {
    IconComponent = Cube01;
  }

  if (variant === "globe-01") {
    IconComponent = Globe01;
  }

  if (variant === "play") {
    IconComponent = Play;
  }

  if (variant === "link-04") {
    IconComponent = Link04;
  }

  if (variant === "facebook") {
    IconComponent = Facebook;
  }

  if (variant === "clock") {
    IconComponent = Clock;
  }

  if (variant === "marker-pin-01") {
    IconComponent = MarkerPin01;
  }

  if (variant === "users-01") {
    IconComponent = Users01;
  }

  if (variant === "chevron-down") {
    IconComponent = ChevronDown;
  }

  if (variant === "chevron-up") {
    IconComponent = ChevronUp;
  }

  if (variant === "target-05") {
    IconComponent = Target05;
  }

  if (variant === "target-04") {
    IconComponent = Target04;
  }

  if (variant === "stars-02") {
    IconComponent = Stars02;
  }

  if (variant === "face-smile") {
    IconComponent = FaceSmile;
  }

  if (variant === "chevron-right") {
    IconComponent = ChevronRight;
  }

  if (variant === "arrow-square-up-right") {
    IconComponent = ArrowSquareUpRight;
  }

  if (variant === "copy-01") {
    IconComponent = Copy01;
  }

  if (variant === "folder") {
    IconComponent = Folder;
  }

  if (variant === "edit-03") {
    IconComponent = Edit03;
  }

  if (variant === "database-01") {
    IconComponent = Database01;
  }

  if (variant === "file-code-01") {
    IconComponent = FileCode01;
  }

  if (variant === "book-closed") {
    IconComponent = BookClosed;
  }

  if (variant === "flag-06") {
    IconComponent = Flag06;
  }

  if (variant === "bank") {
    IconComponent = Bank;
  }

  if (variant === "glasses-02") {
    IconComponent = Glasses02;
  }

  if (variant === "flag-06") {
    IconComponent = Flag06;
  }

  if (variant === "marker-pin-02") {
    IconComponent = MarkerPin02;
  }

  if (variant === "check") {
    IconComponent = Check;
  }

  if (variant === "download-01") {
    IconComponent = Download01;
  }

  if(variant === 'folder-plus') {
    IconComponent = FolderPlus
  }

  if (variant === "dot") {
    IconComponent = Dot;
  }

  if(variant === 'shield-tick') {
    IconComponent = ShieldTick
  }

  if(variant === 'check-circle') {
    IconComponent = CheckCircle
  }

  if(variant === 'search-sm') {
    IconComponent = SearchSm;
  }

  if(variant === 'search-md') {
    IconComponent = SearchMd;
  }

  if(variant === 'search-lg') {
    IconComponent = SearchLg;
  }

  if(variant === 'annotation-dots') {
    IconComponent = AnnotationDots;
  }

  if(variant === 'rss-01') {
    IconComponent = Rss01;
  }

  if(variant === 'pencil-line') {
    IconComponent = PencilLine;
  }

  if(variant === 'ethereum') {
    IconComponent = Ethereum;
  }

  if(variant === 'ethereum-dark') {
    IconComponent = EthereumDark;
  }

  if(variant === 'arbitrum') {
    IconComponent = Arbitrum;
  }

  if(variant === 'arbitrum-dark') {
    IconComponent = ArbitrumDark;
  }

  if(variant === 'bnbchain') {
    IconComponent = BNBChain;
  }

  if(variant === 'bnbchain-dark') {
    IconComponent = BNBChainDark;
  }

  if(variant === 'avalanche') {
    IconComponent = Avalanche;
  }

  if(variant === 'avalanche-dark') {
    IconComponent = AvalancheDark;
  }

  if(variant === 'polygon') {
    IconComponent = Polygon;
  }

  if(variant === 'polygon-dark') {
    IconComponent = PolygonDark;
  }

  if(variant === 'check-circle-filled') {
    IconComponent = CheckCircleFilled
  }

  if(variant === 'message-dots-circle') {
    IconComponent = MessageDotsCircle
  }

  if(variant === 'lightbulb-03') {
    IconComponent = Lightbulb03
  }

  if(variant === 'line-chart-up-03') {
    IconComponent = LineChartUp03
  }

  if(variant === 'user-square') {
    IconComponent = UserSquare
  }

  if(variant === 'dots-grid') {
    IconComponent = DotsGrid
  }

  if(variant === 'heart-hand') {
    IconComponent = HeartHand
  }

  if(variant === 'mail-02') {
    IconComponent = Mail02
  }

  if(variant === 'phone-01') {
    IconComponent = Phone01
  }

  return IconComponent ? <IconComponent width={size} height={size} /> : null;
};
