import { Shield, Clock, Heart, Award } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: Shield,
      title: 'Secure Booking',
      description: 'Your data and payments are protected with industry-standard security.',
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Our team is always available to assist you during your stay.',
    },
    {
      icon: Heart,
      title: 'Curated Spaces',
      description: 'Every apartment is handpicked and inspected for quality assurance.',
    },
    {
      icon: Award,
      title: 'Best Value',
      description: 'Premium living at competitive rates in Ndola, Zambia.',
    },
  ];

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Nobu
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            We deliver an unmatched rental experience with attention to every detail.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`glass-card-strong p-6 text-center animate-fade-in-up stagger-${index + 1}`}
              >
                <div className="w-14 h-14 rounded-2xl bg-[#FF385C]/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-[#FF385C]" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
