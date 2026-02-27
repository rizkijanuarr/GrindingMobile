# FLOW ARCHITECTURE

## Clean Architecture + MVVM

> Versi React Native + TypeScript serupa **Kotlin + Jetpack Compose + Dagger Hilt**

---

## Struktur Folder

```
src/
├── core/           → Pondasi (network, DI, constants)
├── data/           → Akses data (API call)
├── domain/         → Business logic murni
├── presentation/   → UI + ViewModel + Style
```

---

## Detail Per Layer

### `core/` — Pondasi

- `common/Constant.ts` → BASE_URL, FontFamily, ErrorMessage
- `common/Enum.ts` → HttpMethod (GET, POST, PUT, DELETE)
- `common/UiState.ts` → State wrapper: idle | loading | success | error
- `di/RepositoryModule.ts` → Singleton semua Repository instance
- `network/NetworkModule.ts` → HTTP client (fetch + timeout + logging)
- `network/ResponseInterceptor.ts` → Inject token, handle error HTTP status
- `network/ResponseJsonChecker.ts` → Parse response ke JSON

### `data/` — Akses Data

- `services/PostService.ts` → Define API endpoints
- `remote/PostRemoteDataSource.ts` → Panggil Service
- `repository_impl/PostRepositoryImpl.ts` → Implement Repository interface

### `domain/` — Business Logic

- `model/PostModel.ts` → Type/interface data (Post, PostResponse)
- `repository/PostRepository.ts` → Interface contract (apa yang bisa dilakukan)
- `usecase/GetPostsUseCase.ts` → 1 UseCase = 1 aksi bisnis
- `usecase/CreatePostUseCase.ts` → 1 UseCase = 1 aksi bisnis

### `presentation/` — UI (MVVM)

Setiap screen = **1 folder, 3 file wajib:**

```
screens/nama_fitur/
├── NamaScreen.tsx      → View (UI only, zero logic)
├── NamaViewModel.ts    → State + logic + UseCase call
├── NamaStyle.tsx       → StyleSheet terpisah
```

- `navigation/AppNavigator.tsx` → Stack navigator
- `navigation/types.ts` → Type-safe route params
- `theme/index.ts` → Colors, Spacing, FontSize

---

## Alur GetPost

```
Screen → ViewModel → UseCase → Repository(interface) → RepositoryImpl → DataSource → Service → NetworkModule → API
```

**Step by step:**

1. **Screen** → panggil `useMainViewModel()`, render berdasarkan `postsState.status`
2. **ViewModel** → `useFocusEffect` trigger `fetchPosts()`, set UiState loading/success/error
3. **UseCase** → `execute()` → panggil `repository.getPosts()`
4. **Repository (interface)** → contract saja, tidak tahu implementasi
5. **RepositoryImpl** → panggil `remoteDataSource.getPosts()`
6. **RemoteDataSource** → panggil `PostService.getPosts()`
7. **Service** → `networkModule.request('/posts')`
8. **NetworkModule** → build URL, inject headers, fetch, parse JSON
9. **Response balik** → NetworkModule → ... → ViewModel → `setState` → Screen re-render

---

## Panduan Developer Baru

### BAB 1: Apabila hanya menambahkan FITUR BARU dan juga LAYAR sudah ada

> Contoh: tambah "Delete Post" ke MainScreen

**Urutan file:**

```
Service → RemoteDataSource → Repository(interface) → RepositoryImpl → UseCase(baru) → ViewModel → Screen
```

**Steps:**

1. `data/services/PostService.ts` → tambah `deletePost(id)` endpoint
2. `data/remote/PostRemoteDataSource.ts` → tambah method `deletePost(id)`
3. `domain/repository/PostRepository.ts` → tambah `deletePost(id)` di interface
4. `data/repository_impl/PostRepositoryImpl.ts` → implement `deletePost(id)`
5. `domain/usecase/DeletePostUseCase.ts` → buat UseCase baru
6. `MainViewModel.ts` → tambah `deletePost` callback, expose ke return
7. `MainScreen.tsx` → panggil `deletePost(item.id)` di UI

---

### BAB 2: Apabila ingin Menambahkan FITUR BARU dan juga LAYAR SCREEN belum ada

> Contoh: tambah "Post Detail" screen

**Aturan wajib:** Buat folder baru di `presentation/screens/` dengan **3 file:**

> Contoh berikut :

```
screens/post_detail/
├── PostDetailScreen.tsx      → View
├── PostDetailViewModel.ts    → ViewModel
├── PostDetailStyle.tsx       → Style
```

**Steps:**

1. `domain/model/` → buat Model baru (jika response API berbeda)
2. `data/services/` → tambah endpoint
3. `data/remote/` → tambah method di DataSource
4. `domain/repository/` → tambah method di interface
5. `data/repository_impl/` → implement method
6. `domain/usecase/` → buat UseCase baru
7. `presentation/screens/post_detail/` → buat 3 file (Screen, ViewModel, Style)
8. `presentation/navigation/types.ts` → tambah route type
9. `presentation/navigation/AppNavigator.tsx` → daftarkan `Stack.Screen`
10. Screen lain → navigasi dengan `navigation.navigate('PostDetail', { postId })`
