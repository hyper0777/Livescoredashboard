import { motion } from "motion/react";
import { Trophy, Zap, TrendingUp, Clock, Users, Globe } from "lucide-react";
import { Badge } from "@/app/components/ui/badge";

interface HeroSectionProps {
  liveMatchCount: number;
  totalMatchCount: number;
}

export function HeroSection({ liveMatchCount, totalMatchCount }: HeroSectionProps) {
  const stats = [
    { icon: Zap, label: "Live Now", value: liveMatchCount.toString(), color: "text-red-500" },
    { icon: Trophy, label: "Total Matches", value: totalMatchCount.toString(), color: "text-emerald-500" },
    { icon: Globe, label: "Global Coverage", value: "150+", color: "text-blue-500" },
    { icon: Users, label: "Active Users", value: "2.5M+", color: "text-purple-500" },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl mb-12">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-700 to-cyan-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>
        
        {/* Animated Orbs */}
        <motion.div
          className="absolute -top-20 -right-20 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative px-8 py-12 md:px-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-4"
              >
                <Badge className="bg-red-500/20 text-red-100 border-red-400/30 backdrop-blur-sm">
                  <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse mr-2"></span>
                  {liveMatchCount} Matches Live Now
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-5xl md:text-6xl font-bold text-white mb-4"
              >
                Live Sports
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-emerald-300 to-cyan-300">
                  Around the World
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg text-emerald-100 mb-6"
              >
                Real-time scores, instant updates, and comprehensive coverage of football, basketball, cricket, and more. Never miss a moment of the action.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center gap-4"
              >
                <div className="flex items-center gap-2 text-emerald-100">
                  <Clock className="w-5 h-5" />
                  <span className="text-sm">Updates every 30s</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-100">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-sm">Live Statistics</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Stats Grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className={`mb-3 ${stat.color}`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <div className="text-3xl font-bold text-white mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-emerald-100 opacity-90">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-10 right-10 hidden lg:block"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 border border-white/20">
            <Trophy className="w-8 h-8 text-yellow-300" />
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-10 hidden lg:block"
          animate={{
            y: [0, 15, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 border border-white/20">
            <Zap className="w-8 h-8 text-cyan-300" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
