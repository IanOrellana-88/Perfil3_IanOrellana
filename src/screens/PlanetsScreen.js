import { FlatList, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Card from '../components/Card';
import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';
import { colors, spacing } from '../constants/theme';
import usePlanets from '../hooks/usePlanets';

export default function PlanetsScreen() {
  const insets = useSafeAreaInsets();
  const { planets, loading, error, refetch } = usePlanets();

  if (loading && planets.length === 0) {
    return <Loader message="Cargando planetas..." />;
  }

  if (error && planets.length === 0) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  return (
    <FlatList
      style={styles.screen}
      contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + spacing.lg }]}
      data={planets}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <Card
          title={item.name}
          image={item.image}
          description={item.description}
          tag={item.isDestroyed ? 'Destruido' : 'Intacto'}
          tagColor={item.isDestroyed ? colors.danger : colors.success}
        />
      )}
      ItemSeparatorComponent={Separator}
      refreshing={loading}
      onRefresh={refetch}
    />
  );
}

function Separator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    padding: spacing.md,
  },
  separator: {
    height: spacing.md,
  },
});
