import React, { useEffect, useRef, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  Zap,
  Smartphone,
  Clock,
  Sparkles,
  Calendar,
  Video,
  Send,
  Star,
  Users,
  Play,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Building2,
  PartyPopper,
  Camera,
} from "lucide-react";

const Index = () => {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const [activeReelCategory, setActiveReelCategory] = useState("all");
  const [currentTime, setCurrentTime] = useState<string>("9:41");
  const reelCarouselRef = useRef<HTMLDivElement>(null);

  // Update current time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const formattedTime = `${hours}:${minutes.toString().padStart(2, "0")}`;
      setCurrentTime(formattedTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll carousel
  useEffect(() => {
    const carousel = reelCarouselRef.current;
    if (!carousel) return;

    let scrollDirection = 1;
    const autoScroll = setInterval(() => {
      const maxScroll = carousel.scrollWidth - carousel.clientWidth;

      if (carousel.scrollLeft >= maxScroll - 10) {
        scrollDirection = -1;
      } else if (carousel.scrollLeft <= 10) {
        scrollDirection = 1;
      }

      carousel.scrollBy({
        left: scrollDirection * 2,
        behavior: "auto",
      });
    }, 30);

    // Pause on hover
    const handleMouseEnter = () => clearInterval(autoScroll);
    const handleMouseLeave = () => {};

    carousel.addEventListener("mouseenter", handleMouseEnter);
    carousel.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearInterval(autoScroll);
      carousel.removeEventListener("mouseenter", handleMouseEnter);
      carousel.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [activeReelCategory]);

  // Scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1, rootMargin: "-50px" },
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning-Fast Delivery",
      description:
        "Get your professionally edited reel delivered in just 10 minutes. Share your moments while they're still fresh!",
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Shot on iPhone",
      description:
        "Our creators use the latest iPhones to capture cinematic quality content. No bulky equipment needed.",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Professional Editing",
      description:
        "Expert on-the-spot editing with transitions, music, and effects. Your reel is polished and ready to post.",
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Easy Booking",
      description:
        "Book a shoot instantly through our platform. Pick your time and place – we'll be there.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Book a Shoot",
      description:
        "Select your date, time, and location. Get matched with a nearby Reel Now creator instantly.",
      icon: <Calendar className="w-6 h-6" />,
    },
    {
      number: "02",
      title: "We Shoot & Edit",
      description:
        "Our creator arrives with their iPhone and gimbal. They capture all the right angles and edit on the spot.",
      icon: <Video className="w-6 h-6" />,
    },
    {
      number: "03",
      title: "Instant Delivery",
      description:
        "Within 10 minutes of finishing, receive your polished reel ready to share on Instagram and beyond.",
      icon: <Send className="w-6 h-6" />,
    },
  ];

  const stats = [
    { number: "50,000+", label: "Reels Delivered" },
    { number: "150+", label: "Brands Served" },
    { number: "4.9", label: "Average Rating", suffix: "★" },
    { number: "10", label: "Min Delivery", suffix: "min" },
  ];

  const testimonials = [
    {
      quote:
        "Reel Now captured our product launch perfectly. The reel was ready before the event even ended! Incredible speed and quality.",
      author: "Priya Sharma",
      role: "Marketing Director, TechStart",
      rating: 5,
    },
    {
      quote:
        "As an influencer, I need content fast. Reel Now delivers every time. My followers love the quality, and I love the convenience.",
      author: "Arjun Mehta",
      role: "Lifestyle Influencer",
      rating: 5,
    },
    {
      quote:
        "We use Reel Now for all our corporate events now. Professional, quick, and the reels always exceed expectations.",
      author: "Sarah Johnson",
      role: "Event Manager, Celebrate Inc.",
      rating: 5,
    },
  ];

  const creatorBenefits = [
    "No expensive gear – just your iPhone",
    "Get paid instantly after each shoot",
    "Flexible schedule – work when you want",
    "Join a creative community",
    "Training & support provided",
  ];

  // Reel categories
  const reelCategories = [
    { id: "all", name: "All" },
    { id: "events", name: "Events & Weddings" },
    { id: "corporate", name: "Corporate" },
    { id: "celebrities", name: "Celebrities" },
    { id: "products", name: "Product Shoots" },
    { id: "concerts", name: "Concerts" },
    { id: "food", name: "Food & Restaurants" },
    { id: "lifestyle", name: "Lifestyle" },
  ];

  // Reels Data - Add your video URLs here
  // videoUrl: Direct link to video file (mp4, webm, etc.)
  const reels = [
    {
      id: 1,
      videoUrl:
        "https://assets.mixkit.co/videos/preview/mixkit-friends-with-colored-smoke-702-large.mp4",
      thumbnail:
        "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2Fevents%20photography%2FeventPhotography1.JPG?alt=media&token=40e38241-8b06-4359-b266-92ad3e947972",
      category: "events",
      title: "Wedding Celebration",
    },
    {
      id: 2,
      videoUrl:
        "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smart-phone-close-up-4698-large.mp4",
      thumbnail:
        "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2Fproduct%20Photography%2FproductPhotography1.JPG?alt=media&token=8f71e554-5e6b-4451-b7d5-2e711e08d0f4",
      category: "products",
      title: "Product Showcase",
    },
    {
      id: 3,
      videoUrl:
        "https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-1232-large.mp4",
      thumbnail:
        "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2FCultural%20Photography%2FCulturalPhotography1.JPG?alt=media&token=88528b76-0d08-4237-8147-5e7bccb44eea",
      category: "events",
      title: "Cultural Event",
    },
    {
      id: 4,
      videoUrl:
        "https://assets.mixkit.co/videos/preview/mixkit-top-view-of-a-cup-of-cappuccino-and-a-piece-of-37-large.mp4",
      thumbnail:
        "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2Ffood%20Photography%2FIMG_1874.JPG?alt=media&token=4dfa9937-f2dd-4cf5-9fb3-a15ffa5df5e7",
      category: "food",
      title: "Restaurant Reel",
    },
    {
      id: 5,
      videoUrl:
        "https://assets.mixkit.co/videos/preview/mixkit-woman-running-through-a-field-at-sunset-40783-large.mp4",
      thumbnail:
        "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2FCultural%20Photography%2FCulturalPhotography10.jpg?alt=media&token=b6253bda-1bc2-416c-87be-464efb15831f",
      category: "lifestyle",
      title: "Lifestyle Content",
    },
    {
      id: 6,
      videoUrl:
        "https://assets.mixkit.co/videos/preview/mixkit-putting-on-a-necklace-512-large.mp4",
      thumbnail:
        "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2Fproduct%20Photography%2FproductPhotography10.jpeg?alt=media&token=f5d9895d-47e3-457d-84a7-31af27c3706f",
      category: "products",
      title: "Brand Story",
    },
    {
      id: 7,
      videoUrl:
        "https://assets.mixkit.co/videos/preview/mixkit-business-team-meeting-in-office-8107-large.mp4",
      thumbnail:
        "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2Fevents%20photography%2FeventPhotography2.jpeg?alt=media&token=c9b26b19-9b90-4cb5-8a7d-96b29e4ba9ed",
      category: "corporate",
      title: "Corporate Event",
    },
    {
      id: 8,
      videoUrl:
        "https://assets.mixkit.co/videos/preview/mixkit-people-dancing-at-a-nightclub-4344-large.mp4",
      thumbnail:
        "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2FCultural%20Photography%2FCulturalPhotography5.jpeg?alt=media&token=0f2773e6-1765-4356-a1d1-d4f6f6c42845",
      category: "events",
      title: "Festival Vibes",
    },
  ];

  // State for playing video
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});

  // Handle video play/pause
  const handleVideoClick = (reelId: number) => {
    const video = videoRefs.current[reelId];
    if (video) {
      if (playingVideo === reelId) {
        video.pause();
        setPlayingVideo(null);
      } else {
        // Pause any other playing video
        if (playingVideo !== null && videoRefs.current[playingVideo]) {
          videoRefs.current[playingVideo]?.pause();
        }
        video.play();
        setPlayingVideo(reelId);
      }
    }
  };

  const filteredReels =
    activeReelCategory === "all"
      ? reels
      : reels.filter((reel) => reel.category === activeReelCategory);

  const scrollReels = (direction: "left" | "right") => {
    if (reelCarouselRef.current) {
      const scrollAmount = 320;
      reelCarouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-black min-h-screen overflow-x-hidden">
      <Navigation />

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Video/Image */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('')`,
            }}
          />
          <div className="hero-overlay absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse-slow delay-1000" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 px-4 max-w-7xl mx-auto py-20 lg:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Text Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <div className="animate-fade-in">
                <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6 lg:mb-8">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                  <span className="text-sm text-white/80">
                    Reels delivered in 10 minutes
                  </span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold mb-4 lg:mb-6 animate-slide-up text-shadow-lg">
                <span className="gradient-text-white">Instant Reels,</span>
                <br />
                <span className="gradient-text">Shot on iPhone</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto lg:mx-0 mb-8 lg:mb-10 animate-slide-up delay-100 px-2 sm:px-0">
                Book professional reel makers instantly. Get high-quality
                Instagram reels delivered in{" "}
                <span className="text-cyan-400 font-semibold">10 minutes</span>{" "}
                – perfect for creators, brands, and events.
              </p>

              <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3 sm:gap-4 animate-slide-up delay-200">
                <button
                  onClick={scrollToContact}
                  className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-bold rounded-full text-base sm:text-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  Book a Reel Now
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="#join"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 glass hover:bg-white/10 text-white font-semibold rounded-full text-base sm:text-lg transition-all duration-300 border border-white/20 text-center"
                >
                  Become a Creator
                </a>
              </div>
            </div>

            {/* Right Side - iPhone 17 Pro Max Mockup */}
            <div className="relative flex items-center justify-center lg:justify-end animate-slide-up delay-300 order-1 lg:order-2 mb-8 lg:mb-0">
              <div className="relative w-[280px] sm:w-[300px] md:w-[320px] lg:w-[340px]">
                {/* iPhone 17 Pro Max Frame */}
                <div className="relative bg-gradient-to-b from-gray-900 to-black rounded-[3.5rem] p-3 shadow-2xl border-[6px] border-gray-800">
                  {/* Dynamic Island */}
                  <div className="absolute top-5 left-1/2 -translate-x-1/2 w-20 h-4 lg:w-28 lg:h-7 bg-black rounded-full z-20 flex items-center justify-center gap-2 px-4"></div>

                  {/* Screen */}
                  <div className="relative bg-black rounded-[3rem] overflow-hidden aspect-[9/19.5]">
                    {/* Status Bar */}
                    <div className="absolute top-0 left-0 right-0 h-14 bg-transparent z-10 flex items-center justify-between px-8 pt-4">
                      <span className="text-white text-sm font-semibold">
                        {currentTime}
                      </span>
                    </div>

                    {/* Full Screen Reel - No Scrollbar */}
                    <div className="absolute inset-0 overflow-hidden scrollbar-hide">
                      <div className="w-full h-full overflow-hidden scrollbar-hide">
                        {/* Reel Video/Image */}
                        <div className="relative w-full h-full">
                          <img
                            src="https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2Fevents%20photography%2FeventPhotography1.JPG?alt=media&token=40e38241-8b06-4359-b266-92ad3e947972"
                            alt="ReelNow Reel"
                            className="w-full h-full object-cover"
                          />

                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30" />

                          {/* ReelNow Branding Top */}
                          <div className="absolute top-20 left-4 right-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center shadow-lg">
                                <span className="text-black font-bold text-sm">
                                  R
                                </span>
                              </div>
                              <div>
                                <p className="text-white font-bold text-sm">
                                  ReelNow
                                </p>
                                <p className="text-white/70 text-xs">
                                  @reelnow.in
                                </p>
                              </div>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center border border-white/10">
                              <Video className="w-5 h-5 text-cyan-400" />
                            </div>
                          </div>

                          {/* Engagement Stats */}
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4">
                            <div className="flex flex-col items-center gap-1">
                              <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center border border-white/10">
                                <span className="text-white text-xl">❤️</span>
                              </div>
                              <span className="text-white text-xs font-semibold">
                                1.2K
                              </span>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                              <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center border border-white/10">
                                <span className="text-white text-xl">💬</span>
                              </div>
                              <span className="text-white text-xs font-semibold">
                                89
                              </span>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                              <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center border border-white/10">
                                <span className="text-white text-xl">📤</span>
                              </div>
                              <span className="text-white text-xs font-semibold">
                                Share
                              </span>
                            </div>
                          </div>

                          {/* Bottom Info */}
                          <div className="absolute bottom-8 left-4 right-4">
                            <p className="text-white font-bold text-lg mb-2">
                              Wedding Celebration Reel
                            </p>
                            <p className="text-white/80 text-sm mb-3">
                              Captured and edited in 10 minutes by ReelNow
                            </p>
                            <div className="flex items-center gap-2">
                              <div className="px-3 py-1.5 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 rounded-full">
                                <span className="text-cyan-400 text-xs font-semibold">
                                  10min Delivery
                                </span>
                              </div>
                              <div className="px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full">
                                <span className="text-white text-xs font-semibold">
                                  ₹1999
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Play Indicator */}
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500/80 to-emerald-500/80 backdrop-blur-sm flex items-center justify-center border-4 border-white/20 shadow-2xl">
                              <Play className="w-10 h-10 text-white fill-white ml-1" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-[3.5rem] blur-3xl -z-10 animate-pulse-slow" />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 scroll-indicator">
          <a
            href="#discover"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("discover")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex flex-col items-center text-white/50 hover:text-white/80 transition-colors"
          >
            <span className="text-xs mb-2 uppercase tracking-wider">
              Scroll
            </span>
            <ChevronDown className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Discover Our Work Section */}
      <section
        id="discover"
        className="section-padding relative bg-gradient-to-b from-black via-cyan-950/10 to-black"
      >
        <div className="max-w-7xl mx-auto relative">
          {/* Section Header */}
          <div
            id="discover-header"
            data-reveal
            className={`text-center mb-10 transition-all duration-700 ${
              isVisible["discover-header"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
              <span className="text-white">Discover with </span>
              <span className="gradient-text">Vibe</span>
            </h2>
            <p className="text-white/60 text-lg">
              Explore trending reels from our creators
            </p>
          </div>

          {/* Category Filters */}
          <div
            id="discover-tabs"
            data-reveal
            className={`flex flex-wrap justify-center gap-3 mb-10 transition-all duration-700 ${
              isVisible["discover-tabs"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {reelCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveReelCategory(category.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeReelCategory === category.id
                    ? "bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-semibold"
                    : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white border border-white/10"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Reels Carousel */}
          <div
            id="discover-carousel"
            data-reveal
            className={`relative transition-all duration-700 ${
              isVisible["discover-carousel"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {/* Navigation Arrows */}
            <button
              onClick={() => scrollReels("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 w-12 h-12 rounded-full bg-black/80 border border-cyan-500/30 items-center justify-center text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all hidden md:flex"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => scrollReels("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 w-12 h-12 rounded-full bg-black/80 border border-cyan-500/30 items-center justify-center text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all hidden md:flex"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Carousel Container */}
            <div
              ref={reelCarouselRef}
              className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth px-4 md:px-0"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {filteredReels.map((reel, index) => (
                <div
                  key={reel.id}
                  className="flex-shrink-0 w-[280px] md:w-[300px] reel-card group cursor-pointer"
                  onClick={() => handleVideoClick(reel.id)}
                >
                  <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-black border border-white/10 transition-all duration-300 group-hover:border-cyan-500/50 group-hover:shadow-lg group-hover:shadow-cyan-500/20">
                    {/* Video Player */}
                    <video
                      ref={(el) => (videoRefs.current[reel.id] = el)}
                      src={reel.videoUrl}
                      poster={reel.thumbnail}
                      className="absolute inset-0 w-full h-full object-cover"
                      loop
                      playsInline
                      muted={playingVideo !== reel.id}
                      onEnded={() => setPlayingVideo(null)}
                    />

                    {/* Gradient overlay - hide when playing */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 transition-opacity duration-300 ${
                        playingVideo === reel.id ? "opacity-0" : "opacity-100"
                      }`}
                    />

                    {/* Play/Pause Button */}
                    <div
                      className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                        playingVideo === reel.id
                          ? "opacity-0 hover:opacity-100"
                          : "opacity-100"
                      }`}
                    >
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-500/50">
                        {playingVideo === reel.id ? (
                          <div className="flex gap-1">
                            <div className="w-1.5 h-6 bg-black rounded-full" />
                            <div className="w-1.5 h-6 bg-black rounded-full" />
                          </div>
                        ) : (
                          <Play className="w-7 h-7 text-black fill-black ml-1" />
                        )}
                      </div>
                    </div>

                    {/* Video badge */}
                    <div
                      className={`absolute top-4 left-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full transition-opacity duration-300 ${
                        playingVideo === reel.id ? "opacity-0" : "opacity-100"
                      }`}
                    >
                      <Video className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="text-[10px] text-white/90 font-medium uppercase tracking-wide">
                        Reel
                      </span>
                    </div>

                    {/* Playing indicator */}
                    {playingVideo === reel.id && (
                      <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-cyan-500/80 backdrop-blur-sm px-2.5 py-1 rounded-full">
                        <span className="flex items-end gap-0.5 h-3">
                          <span className="w-0.5 bg-black rounded-full audio-bar" />
                          <span className="w-0.5 bg-black rounded-full audio-bar" />
                          <span className="w-0.5 bg-black rounded-full audio-bar" />
                        </span>
                        <span className="text-[10px] text-black font-medium uppercase tracking-wide">
                          Playing
                        </span>
                      </div>
                    )}

                    {/* Brand Watermark */}
                    <div
                      className={`absolute top-4 right-4 transition-opacity duration-300 ${
                        playingVideo === reel.id ? "opacity-0" : "opacity-100"
                      }`}
                    >
                      <span className="text-white/60 text-xs font-semibold tracking-wider">
                        REEL<span className="text-cyan-400">NOW</span>
                      </span>
                    </div>

                    {/* Title */}
                    <div
                      className={`absolute bottom-0 left-0 right-0 p-4 transition-opacity duration-300 ${
                        playingVideo === reel.id ? "opacity-0" : "opacity-100"
                      }`}
                    >
                      <p className="text-white font-medium text-sm">
                        {reel.title}
                      </p>
                      <p className="text-cyan-400 text-xs mt-1 flex items-center gap-1">
                        <Play className="w-3 h-3" /> Tap to play
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* View All Button */}
          <div className="text-center mt-8">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToContact();
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-semibold rounded-full hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-105"
            >
              Book Your Reel
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-950/5 to-black" />
        <div className="max-w-7xl mx-auto relative">
          <div
            id="services-header"
            data-reveal
            className={`text-center mb-14 transition-all duration-700 ${
              isVisible["services-header"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
              <Video className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-400 font-medium">
                What We Offer
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 gradient-text-white">
              Our Services
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              Professional reel creation for every occasion. Fast, beautiful,
              and ready to share.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Video,
                title: "Event Reels",
                desc: "Capture the energy of your events with dynamic, shareable reels.",
                price: "From ₹4,999",
                features: ["Live event coverage", "Same-day delivery"],
              },
              {
                icon: Building2,
                title: "Corporate Content",
                desc: "Professional reels for brands, product launches, and corporate events.",
                price: "From ₹9,999",
                features: ["Brand storytelling", "Product showcases"],
              },
              {
                icon: PartyPopper,
                title: "Weddings & Celebrations",
                desc: "Turn your special moments into beautiful, emotional reels.",
                price: "From ₹14,999",
                features: ["Ceremony highlights", "Reception coverage"],
              },
              {
                icon: Sparkles,
                title: "Influencer Content",
                desc: "Quick, high-quality reels for social media influencers.",
                price: "From ₹2,999",
                features: ["Trend-focused", "Fast turnaround"],
              },
              {
                icon: Camera,
                title: "Product Reels",
                desc: "Stunning product reels that showcase your offerings.",
                price: "From ₹3,999",
                features: ["360° views", "E-commerce ready"],
              },
              {
                icon: Users,
                title: "Team & Culture",
                desc: "Show off your company culture with authentic team reels.",
                price: "From ₹7,999",
                features: ["Behind-the-scenes", "Office tours"],
              },
            ].map((service, index) => (
              <div
                key={service.title}
                id={`service-card-${index}`}
                data-reveal
                className={`glass-card p-6 transition-all duration-500 hover:bg-white/10 hover:border-cyan-500/30 hover:-translate-y-1 ${
                  isVisible[`service-card-${index}`]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 flex items-center justify-center mb-5 text-cyan-400">
                  {React.createElement(service.icon, { className: "w-7 h-7" })}
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-white/60 text-sm mb-4">{service.desc}</p>
                <ul className="space-y-2 mb-4">
                  {service.features.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-white/70 text-sm"
                    >
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-cyan-400 font-semibold">
                    {service.price}
                  </span>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById("contact")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-white/70 hover:text-cyan-400 text-sm font-medium flex items-center gap-1"
                  >
                    Book <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div
            id="services-cta"
            data-reveal
            className={`text-center mt-12 transition-all duration-700 ${
              isVisible["services-cta"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <a
              href="#services"
              className="inline-flex items-center gap-2 px-6 py-3 border border-cyan-500/50 text-cyan-400 rounded-full hover:bg-cyan-500/10 transition-all"
            >
              View All Services <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section
        id="why-choose-us"
        className="section-padding relative overflow-hidden"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-950/5 to-black" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-cyan-500/5 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto relative">
          <div
            id="why-header"
            data-reveal
            className={`text-center mb-16 transition-all duration-700 ${
              isVisible["why-header"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-400 font-medium">
                Why Choose Us
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold">
              <span className="text-white">Not Just Instant </span>
              <span className="gradient-text">Delivery,</span>
              <span className="text-white"> But..</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 - Trained & Certified */}
            <div
              id="why-card-1"
              data-reveal
              className={`group relative overflow-hidden rounded-2xl glass-card p-6 transition-all duration-500 hover:bg-white/10 hover:border-cyan-500/30 hover:-translate-y-1 ${
                isVisible["why-card-1"]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 flex items-center justify-center">
                  <Users className="w-7 h-7 text-cyan-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-display font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    Trained & Certified Reel Makers
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Each Partner clears 6 filters to get their certification
                  </p>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Card 2 - Easy Booking */}
            <div
              id="why-card-2"
              data-reveal
              className={`group relative overflow-hidden rounded-2xl glass-card p-6 transition-all duration-500 hover:bg-white/10 hover:border-cyan-500/30 hover:-translate-y-1 ${
                isVisible["why-card-2"]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 flex items-center justify-center">
                  <Calendar className="w-7 h-7 text-cyan-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-display font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    Easy Booking
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Stop struggling with complex booking procedures
                  </p>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Card 3 - Unbelievable Pricing */}
            <div
              id="why-card-3"
              data-reveal
              className={`group relative overflow-hidden rounded-2xl glass-card p-6 transition-all duration-500 hover:bg-white/10 hover:border-cyan-500/30 hover:-translate-y-1 ${
                isVisible["why-card-3"]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 flex items-center justify-center">
                  <Sparkles className="w-7 h-7 text-cyan-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-display font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    Unbelievable Pricing
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Each Reel starts at just{" "}
                    <span className="text-cyan-400 font-semibold">₹1999/-</span>
                  </p>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Card 4 - Safe & Secure */}
            <div
              id="why-card-4"
              data-reveal
              className={`group relative overflow-hidden rounded-2xl glass-card p-6 transition-all duration-500 hover:bg-white/10 hover:border-cyan-500/30 hover:-translate-y-1 ${
                isVisible["why-card-4"]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7 text-cyan-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-display font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    Safe & Secure
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    You & your data is completely safe and secured
                  </p>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Card 5 - Instant Reels */}
            <div
              id="why-card-5"
              data-reveal
              className={`group relative overflow-hidden rounded-2xl glass-card p-6 transition-all duration-500 hover:bg-white/10 hover:border-cyan-500/30 hover:-translate-y-1 ${
                isVisible["why-card-5"]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 flex items-center justify-center">
                  <Zap className="w-7 h-7 text-cyan-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-display font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    Instant Reels, Instant Editing
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    No hidden charges! Upfront pricing & seamless checkout
                  </p>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Card 6 - Women Safety */}
            <div
              id="why-card-6"
              data-reveal
              className={`group relative overflow-hidden rounded-2xl glass-card p-6 transition-all duration-500 hover:bg-white/10 hover:border-cyan-500/30 hover:-translate-y-1 ${
                isVisible["why-card-6"]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "500ms" }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                  <Users className="w-7 h-7 text-pink-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-display font-bold text-white mb-2 group-hover:text-pink-400 transition-colors">
                    Women Safety
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Women can book a female Reel maker for added comfort
                  </p>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-pink-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section-padding relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-50" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-radial from-cyan-500/10 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto relative">
          <div
            id="features-header"
            data-reveal
            className={`text-center mb-16 transition-all duration-700 ${
              isVisible["features-header"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wider">
              Our Process
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mt-4 mb-6 gradient-text-white">
              What Makes Reel Now Special
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              Experience the fastest, most convenient way to get professional
              reels for your brand, event, or personal content.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                id={`feature-${index}`}
                data-reveal
                className={`feature-card transition-all duration-700 ${
                  isVisible[`feature-${index}`]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 flex items-center justify-center mb-6 text-cyan-400">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-display font-semibold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-white/60 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="section-padding relative bg-gradient-to-b from-transparent via-cyan-950/10 to-transparent"
      >
        <div className="max-w-7xl mx-auto">
          <div
            id="hiw-header"
            data-reveal
            className={`text-center mb-16 transition-all duration-700 ${
              isVisible["hiw-header"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wider">
              Simple Process
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mt-4 mb-6 gradient-text-white">
              How It Works
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              From booking to final cut, getting your reel is incredibly easy.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
            {/* Connection line */}
            <div className="hidden lg:block absolute top-24 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-cyan-500/50 via-emerald-500/50 to-cyan-500/50" />

            {steps.map((step, index) => (
              <div
                key={step.number}
                id={`step-${index}`}
                data-reveal
                className={`relative transition-all duration-700 ${
                  isVisible[`step-${index}`]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="glass-card p-8 text-center relative">
                  {/* Step number */}
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center text-black font-bold text-lg">
                    {step.number}
                  </div>

                  <div className="mt-6 mb-4 w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto text-cyan-400">
                    {step.icon}
                  </div>

                  <h3 className="text-xl font-display font-semibold mb-3 text-white">
                    {step.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join as Creator Section */}
      <section id="join" className="section-padding relative overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/reelnow%2Fpersonalized_photoshoot.jpeg?alt=media&token=f9810ea6-3d37-485c-b0de-737f53c7ad9d')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/70" />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div
              id="join-content"
              data-reveal
              className={`transition-all duration-700 ${
                isVisible["join-content"]
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wider">
                For Creators
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-bold mt-4 mb-6">
                Turn Your iPhone Into an{" "}
                <span className="gradient-text">Income Machine</span>
              </h2>
              <p className="text-white/70 text-lg mb-8 leading-relaxed">
                Have an iPhone and a passion for creating videos? Join Reel Now
                and get paid to do what you love. No DSLR. No fancy equipment.
                Just bring your iPhone and creativity.
              </p>

              <ul className="space-y-4 mb-8">
                {creatorBenefits.map((benefit, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-white/80"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={scrollToContact}
                className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-bold rounded-full text-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                Apply Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div
              id="join-image"
              data-reveal
              className={`relative transition-all duration-700 ${
                isVisible["join-image"]
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              <div className="glass-card p-8 lg:p-12">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center mx-auto mb-6">
                    <Smartphone className="w-10 h-10 text-black" />
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-4 text-white">
                    Start Earning Today
                  </h3>
                  <p className="text-white/60 mb-6">
                    Join 500+ creators already earning with Reel Now. All you
                    need is an iPhone 13 Pro or newer.
                  </p>
                  <div className="flex items-center justify-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-cyan-400" />
                      <span className="text-white/70">Instant Payouts</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-cyan-400" />
                      <span className="text-white/70">Flexible Hours</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats & Testimonials Section */}
      <section id="testimonials" className="section-padding relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/10 to-transparent" />

        <div className="max-w-7xl mx-auto relative">
          {/* Stats */}
          <div
            id="stats"
            data-reveal
            className={`grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20 transition-all duration-700 ${
              isVisible["stats"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {stats.map((stat, index) => (
              <div key={stat.label} className="glass-card p-6 text-center">
                <div className="stat-number">
                  {stat.number}
                  {stat.suffix && (
                    <span className="text-2xl md:text-3xl">{stat.suffix}</span>
                  )}
                </div>
                <p className="text-white/60 mt-2 text-sm uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div
            id="testimonials-header"
            data-reveal
            className={`text-center mb-12 transition-all duration-700 ${
              isVisible["testimonials-header"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wider">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mt-4 gradient-text-white">
              What Our Clients Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                id={`testimonial-${index}`}
                data-reveal
                className={`testimonial-card transition-all duration-700 ${
                  isVisible[`testimonial-${index}`]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-cyan-400 text-cyan-400"
                    />
                  ))}
                </div>
                <p className="text-white/80 leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-semibold text-white">
                    {testimonial.author}
                  </p>
                  <p className="text-white/50 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact/CTA Section */}
      <section id="contact" className="section-padding relative">
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/20 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-cyan-500/5 to-transparent pointer-events-none" />

        <div className="max-w-4xl mx-auto relative">
          <div
            id="cta-content"
            data-reveal
            className={`text-center transition-all duration-700 ${
              isVisible["cta-content"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Ready to <span className="gradient-text">Reel It In?</span>
            </h2>
            <p className="text-white/60 text-lg mb-12 max-w-2xl mx-auto">
              Your next viral reel is just moments away. Book now and experience
              the fastest way to professional content.
            </p>
          </div>

          {/* Contact Form */}
          <div
            id="contact-form"
            data-reveal
            className={`glass-card p-8 md:p-12 transition-all duration-700 ${
              isVisible["contact-form"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/80 text-sm mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-white/80 text-sm mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all"
                  placeholder="Your phone number"
                />
              </div>
              <div>
                <label className="block text-white/80 text-sm mb-2">
                  Message *
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all resize-none"
                  placeholder="Tell us about your project..."
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-bold rounded-xl text-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                Send Message
                <Send className="w-5 h-5" />
              </button>
            </form>

            {/* Contact Info */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <a
                  href="mailto:info@reelnow.in"
                  className="flex flex-col items-center gap-2 text-white/60 hover:text-cyan-400 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span className="text-sm">info@reelnow.in</span>
                </a>
                <a
                  href="tel:+919010994207"
                  className="flex flex-col items-center gap-2 text-white/60 hover:text-cyan-400 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span className="text-sm">+91 90109 94207</span>
                </a>
                <div className="flex flex-col items-center gap-2 text-white/60">
                  <MapPin className="w-5 h-5" />
                  <span className="text-sm">Hyderabad, India</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Mobile Floating Book Now Button */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <button
          onClick={scrollToContact}
          className="group flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-semibold rounded-full shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <Calendar className="w-5 h-5" />
          <span>Book Now</span>
        </button>
      </div>
    </div>
  );
};

export default Index;
