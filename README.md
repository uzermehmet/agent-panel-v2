# VisaFlow - Vize Başvuru Yönetim Sistemi

## Proje Hakkında

VisaFlow, vize danışmanlık şirketlerinin müşteri başvurularını, evrak yönetimini ve randevu süreçlerini tek bir platform üzerinden yönetmelerini sağlayan kapsamlı bir yönetim sistemidir.

## Özellikler

- **Başvuru Yönetimi**: Vize başvurularının oluşturulması, takibi ve yönetimi
- **Evrak Yönetimi**: Başvuru evraklarının yüklenmesi, onaylanması ve takibi
- **Randevu Yönetimi**: Konsolosluk randevularının planlanması ve takibi
- **Müşteri Yönetimi**: Müşteri bilgilerinin saklanması ve yönetimi
- **Personel Yönetimi**: Sistem kullanıcılarının yetkilendirilmesi ve yönetimi
- **Raporlama**: Başvuru, müşteri ve personel performans raporları

## Teknolojiler

- React
- TypeScript
- Tailwind CSS
- Vite

## Kurulum

```bash
# Projeyi klonlayın
git clone [repo-url]

# Proje dizinine gidin
cd agent-panel-v1

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

## Proje Yapısı

```
src/
├── components/     # Yeniden kullanılabilir UI bileşenleri
├── pages/          # Uygulama sayfaları
├── services/       # API ve veri servisleri
├── hooks/          # Özel React hook'ları
├── utils/          # Yardımcı fonksiyonlar
├── types/          # TypeScript tip tanımlamaları
├── assets/         # Statik dosyalar (resimler, fontlar vb.)
├── styles/         # Global stil dosyaları
├── App.tsx         # Ana uygulama bileşeni
└── main.tsx        # Uygulama giriş noktası
```

## Modüller

### Başvuru Modülü
- Başvuru listesi görüntüleme
- Yeni başvuru oluşturma
- Başvuru detaylarını görüntüleme ve düzenleme
- Başvuru durumu takibi

### Evrak Modülü
- Evrak listesi görüntüleme
- Evrak yükleme ve indirme
- Evrak onaylama/reddetme
- Evrak versiyonlama

### Randevu Modülü
- Randevu takvimi görüntüleme
- Randevu oluşturma ve düzenleme
- Randevu hatırlatmaları
- Randevu durumu takibi

### Müşteri Modülü
- Müşteri listesi görüntüleme
- Müşteri ekleme ve düzenleme
- Müşteri başvuru geçmişi
- Müşteri iletişim bilgileri yönetimi

## Katkıda Bulunma

1. Bu repo'yu fork edin
2. Feature branch'i oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inize push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## Lisans

Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır.
