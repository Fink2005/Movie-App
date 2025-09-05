import { Client, ID, Query, TablesDB } from 'react-native-appwrite';

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_MOVIES_COLLECTION_ID!;

const client = new Client()
  .setEndpoint('https://syd.cloud.appwrite.io/v1')
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new TablesDB(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    // Use the object parameter style for listDocuments
    const res = await database.listRows({
      databaseId: DATABASE_ID,
      tableId: COLLECTION_ID,
      queries: [Query.equal('searchTerm', query)],
    });

    if (res.total) {
      const existingMovie = res.rows;
      await database.updateRow({
        databaseId: DATABASE_ID,
        tableId: COLLECTION_ID,
        rowId: existingMovie[0].$id,
        data: {
          count: (existingMovie[0].count || 0) + 1,
        },
      });
    } else {
      await database.createRow({
        databaseId: DATABASE_ID,
        tableId: COLLECTION_ID,
        rowId: ID.unique(),
        data: {
          searchTerm: query,
          movie_id: movie.id,
          count: 1,
          title: movie.title,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        },
      });
    }
  } catch (error) {
    console.error('Error updating search count:', error);
    throw error; // Rethrow or handle as needed
  }
};

export const getTrendingMovies = async (): Promise<TrendingMovie[]> => {
  try {
    const res = await database.listRows({
      databaseId: DATABASE_ID,
      tableId: COLLECTION_ID,
      queries: [Query.limit(10), Query.orderDesc('count')],
    });
    return res.rows as unknown as Promise<TrendingMovie[]>;
  } catch (error) {
    console.log(error);
    return [] as unknown as Promise<TrendingMovie[]>;
  }
};
