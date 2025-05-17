import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Globe, Building2, User, Phone, Mail, MapPin, Globe2, ArrowLeft } from 'lucide-react';

interface FormData {
  accountType: 'corporate' | 'individual';
  companyName: string;
  fullName: string;
  phone: string;
  email: string;
  city: string;
  countries: string[];
  referralCode: string;
}

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState<FormData>({
    accountType: 'corporate',
    companyName: '',
    fullName: '',
    phone: '',
    email: '',
    city: '',
    countries: [],
    referralCode: ''
  });

  const countries = [
    { id: 'schengen', name: 'Avrupa (Schengen)' },
    { id: 'usa', name: 'Amerika' },
    { id: 'canada', name: 'Kanada' },
    { id: 'uk', name: 'İngiltere' },
    { id: 'other', name: 'Diğer' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCountryChange = (countryId: string) => {
    setFormData(prev => {
      const countries = prev.countries.includes(countryId)
        ? prev.countries.filter(id => id !== countryId)
        : [...prev.countries, countryId];
      return { ...prev, countries };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to success page or login
      navigate('/register/success');
    } catch (err) {
      setError('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-sm">
        <div className="text-center">
          <div className="flex justify-center">
            <Globe className="h-12 w-12 text-primary-600" />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">Ön Başvuru</h2>
          <p className="mt-2 text-gray-600">VisaFlow'a katılmak için ön başvuru yapın</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hesap Tipi
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, accountType: 'corporate' }))}
                  className={`p-4 border rounded-lg text-center ${
                    formData.accountType === 'corporate'
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Building2 className="h-6 w-6 mx-auto mb-2" />
                  <span className="block text-sm font-medium">Kurumsal</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, accountType: 'individual' }))}
                  className={`p-4 border rounded-lg text-center ${
                    formData.accountType === 'individual'
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <User className="h-6 w-6 mx-auto mb-2" />
                  <span className="block text-sm font-medium">Bireysel</span>
                </button>
              </div>
            </div>

            {formData.accountType === 'corporate' && (
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                  Firma Ünvanı <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building2 className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    required
                    value={formData.companyName}
                    onChange={handleChange}
                    className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Ad Soyad <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Telefon <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                E-posta <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                İl <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="city"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hizmet verilen Ülkeler <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                {countries.map(country => (
                  <label key={country.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.countries.includes(country.id)}
                      onChange={() => handleCountryChange(country.id)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">{country.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="referralCode" className="block text-sm font-medium text-gray-700 mb-1">
                Referans Kodu
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Globe2 className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="referralCode"
                  name="referralCode"
                  value={formData.referralCode}
                  onChange={handleChange}
                  className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Gönderiliyor...' : 'Başvuru Yap'}
            </button>
          </div>

          <div className="text-center">
            <Link 
              to="/login" 
              className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Giriş sayfasına dön
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
