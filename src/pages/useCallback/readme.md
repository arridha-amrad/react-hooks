useCallback

- menyimpan (cache) fungsi agar tidak dibuat ulang setiap kali komponen melakukan re-render

- sangat berguna ketika kamu ingin menghindari pembuatan ulang fungsi yang dikirim sebagai prop ke komponen anak yang di-memo-isasi (React.memo).

penting karena:

1. fungsi tersebut di kirim ke komponen lain sbg prop
2. fungsi digunakan sbg dependensi di dalam useEffect, useMemo

Membuat fungsi yg sama berulang-ulang kali menyebabkan:

1. Render tidak perlu di komponen anak
2. Kinerja buruk jika fungsi kompleks

# 📚 Kapan perlu pakai useCallback?

✅ Fungsi dikirim ke komponen anak sebagai prop.

✅ Komponen anak menggunakan React.memo(), shouldComponentUpdate(), atau PureComponent.

✅ Kamu mengandalkan fungsi dengan referensi yang stabil (misalnya di dalam useEffect, useMemo, atau array dependency).

✅ Kamu membuat custom-hook yang me-return sebuah atau beberapa fungsi

⚙️ Atau dalam konteks kinerja tinggi, seperti dalam daftar besar atau UI yang sensitif terhadap re-render.
