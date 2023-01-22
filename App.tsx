import { default as CharacterDataProvider } from './hooks/useCharacterData';
import EpisodeDataProvider from './hooks/useEpisodesData';
import NavigationStack from './navigation/Navigator';

export default function App() {
	return (
		<>
			<CharacterDataProvider>
				<EpisodeDataProvider>
					<NavigationStack />
				</EpisodeDataProvider>
			</CharacterDataProvider>
		</>
	);
}
