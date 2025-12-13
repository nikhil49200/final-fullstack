import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, Shield, Zap, LayoutDashboard, Sparkles } from 'lucide-react';
import Floating3DShapes from '@/components/Floating3DShapes';
import AnimatedBackground from '@/components/AnimatedBackground';
const features = [{
  icon: CheckCircle2,
  title: 'Task Management',
  description: 'Create, update, and organize your tasks with ease. Track progress and stay productive.'
}, {
  icon: Shield,
  title: 'Secure & Private',
  description: 'Your data is protected with industry-standard security. JWT authentication keeps you safe.'
}, {
  icon: Zap,
  title: 'Fast & Responsive',
  description: 'Lightning-fast performance with a beautiful, responsive design that works on any device.'
}];
export default function Index() {
  const navigate = useNavigate();
  const {
    user,
    loading
  } = useAuth();
  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);
  return <div className="min-h-screen gradient-bg relative overflow-hidden">
      <AnimatedBackground />
      <Floating3DShapes />
      
      {/* Header */}
      <header className="container mx-auto px-4 py-6 relative z-10">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-glow">
              <LayoutDashboard className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">TaskFlow</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => navigate('/auth')}>
              Sign in
            </Button>
            <Button onClick={() => navigate('/auth')}>
              Get Started
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6
      }} className="max-w-3xl mx-auto text-center">
          <motion.div initial={{
          opacity: 0,
          scale: 0.9
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          delay: 0.2
        }} whileHover={{
          scale: 1.05
        }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 cursor-default">
            <motion.div animate={{
            rotate: 360
          }} transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'linear'
          }}>
              <Sparkles className="h-4 w-4" />
            </motion.div>
            Full-Stack Task Management
          </motion.div>

          <motion.h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.3,
          duration: 0.6
        }}>
            Organize your work,{' '}
            <motion.span className="gradient-text inline-block" animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }} transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut'
          }} style={{
            backgroundSize: '200% 200%'
          }}>
              amplify productivity
            </motion.span>
          </motion.h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            A modern task management platform with secure authentication, intuitive dashboard, and powerful features to help you stay focused and get things done.
          </p>

          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.4
        }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="xl" variant="hero" onClick={() => navigate('/auth')}>
              Start for free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="xl" variant="hero-outline" onClick={() => navigate('/auth')}>
              Sign in
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20 relative z-10">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6
      }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need to stay productive
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built with modern technologies for the best experience
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => <motion.div key={feature.title} initial={{
          opacity: 0,
          y: 30,
          rotateX: -15
        }} whileInView={{
          opacity: 1,
          y: 0,
          rotateX: 0
        }} whileHover={{
          y: -8,
          rotateX: 5,
          rotateY: 5,
          transition: {
            duration: 0.3
          }
        }} viewport={{
          once: true
        }} transition={{
          delay: index * 0.15,
          duration: 0.5
        }} className="glass rounded-2xl p-8 hover:shadow-elegant transition-shadow duration-300 cursor-pointer" style={{
          transformStyle: 'preserve-3d',
          perspective: 1000
        }}>
              <motion.div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5" whileHover={{
            scale: 1.1,
            rotate: 5
          }} transition={{
            type: 'spring',
            stiffness: 300
          }}>
                <feature.icon className="h-6 w-6 text-primary" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>)}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20 relative z-10">
        <motion.div initial={{
        opacity: 0,
        scale: 0.95
      }} whileInView={{
        opacity: 1,
        scale: 1
      }} viewport={{
        once: true
      }} className="max-w-4xl mx-auto glass rounded-3xl p-10 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to get started?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Join now and start managing your tasks more efficiently with our powerful dashboard.
          </p>
          <Button size="xl" variant="hero" onClick={() => navigate('/auth')}>
            Create free account
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-border/50 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-primary flex items-center justify-center">
              <LayoutDashboard className="h-3 w-3 text-primary-foreground" />
            </div>
            <span>TaskFlow</span>
          </div>
          <p>Built with React, TypeScript 
 </p>
        </div>
      </footer>
    </div>;
}