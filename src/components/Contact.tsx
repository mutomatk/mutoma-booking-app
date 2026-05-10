import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-4 bg-gray-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Have questions? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="glass-card-strong p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-[#FF385C]/10 flex items-center justify-center mx-auto mb-3">
              <MapPin className="w-6 h-6 text-[#FF385C]" />
            </div>
            <h3 className="font-semibold text-gray-900 text-sm mb-1">Location</h3>
            <p className="text-xs text-gray-500">Itawa, Ndola, Zambia</p>
          </div>

          <div className="glass-card-strong p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-[#FF385C]/10 flex items-center justify-center mx-auto mb-3">
              <Phone className="w-6 h-6 text-[#FF385C]" />
            </div>
            <h3 className="font-semibold text-gray-900 text-sm mb-1">Phone</h3>
            <p className="text-xs text-gray-500">+260 97X XXX XXX</p>
          </div>

          <div className="glass-card-strong p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-[#FF385C]/10 flex items-center justify-center mx-auto mb-3">
              <Mail className="w-6 h-6 text-[#FF385C]" />
            </div>
            <h3 className="font-semibold text-gray-900 text-sm mb-1">Email</h3>
            <p className="text-xs text-gray-500">hello@noburesidence.co.zm</p>
          </div>

          <div className="glass-card-strong p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-[#FF385C]/10 flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-[#FF385C]" />
            </div>
            <h3 className="font-semibold text-gray-900 text-sm mb-1">Hours</h3>
            <p className="text-xs text-gray-500">24/7 Support</p>
          </div>
        </div>
      </div>
    </section>
  );
}
