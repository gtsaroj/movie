
class IndexedDBService {
    private dbName = 'movieAppDB';
    private dbVersion = 1;
    private storeName = 'favoriteMovies';
    private db: IDBDatabase | null = null;
  
    async initDB(): Promise<void> {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(this.dbName, this.dbVersion);
  
        request.onerror = () => {
          reject(new Error('Failed to open database'));
        };
  
        request.onsuccess = (event) => {
          this.db = (event.target as IDBOpenDBRequest).result;
          resolve();
        };
  
        request.onupgradeneeded = (event) => {
          const db = (event.target as IDBOpenDBRequest).result;
          if (!db.objectStoreNames.contains(this.storeName)) {
            db.createObjectStore(this.storeName, { keyPath: 'id' });
          }
        };
      });
    }
  
    async addToFavorites(movie: Model.Movie): Promise<void> {
      if (!this.db) {
        await this.initDB();
      }
  
      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction([this.storeName], 'readwrite');
        const store = transaction.objectStore(this.storeName);
        const request = store.add(movie);
  
        request.onsuccess = () => resolve();
        request.onerror = () => reject(new Error('Failed to add movie to favorites'));
      });
    }
  
    async removeFromFavorites(movieId: number): Promise<void> {
      if (!this.db) {
        await this.initDB();
      }
  
      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction([this.storeName], 'readwrite');
        const store = transaction.objectStore(this.storeName);
        const request = store.delete(movieId);
  
        request.onsuccess = () => resolve();
        request.onerror = () => reject(new Error('Failed to remove movie from favorites'));
      });
    }
  
    async getAllFavorites(): Promise<Model.Movie[]> {
      if (!this.db) {
        await this.initDB();
      }
  
      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction([this.storeName], 'readonly');
        const store = transaction.objectStore(this.storeName);
        const request = store.getAll();
  
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(new Error('Failed to get favorite movies'));
      });
    }
  
    async isFavorite(movieId: number): Promise<boolean> {
      if (!this.db) {
        await this.initDB();
      }
  
      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction([this.storeName], 'readonly');
        const store = transaction.objectStore(this.storeName);
        const request = store.get(movieId);
  
        request.onsuccess = () => resolve(!!request.result);
        request.onerror = () => reject(new Error('Failed to check if movie is favorite'));
      });
    }
  }
  
  export const indexedDBService = new IndexedDBService(); 