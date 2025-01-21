import { resizeImage } from '@starter-kit/utils/image';
import Link from 'next/link';
import { useAppContext } from './contexts/appContext';
import { PublicationFragment } from '../generated/graphql';

const getPublicationLogo = (publication: PublicationFragment, isSidebar?: boolean) => {
	if (isSidebar) {
		return publication.preferences.logo; // Always display light mode logo in sidebar
	}
	return publication.preferences.darkMode?.logo || publication.preferences.logo;
}

export const PublicationLogo = ({ isSidebar }: { isSidebar?: boolean }) => {
	const { publication } = useAppContext();
	const PUBLICATION_LOGO = getPublicationLogo(publication, isSidebar);

	return (
		<h1 className="relative w-full border-y-2 border-black">
			<Link
				href={'/'}
				aria-label={`${publication.title} blog home page`}
				className=""
			>
				{PUBLICATION_LOGO ? (
					<>
						<img
							className="block w-32 shrink-0 md:w-40"
							alt={publication.title}
							src={resizeImage(PUBLICATION_LOGO, { w: 320, h: 80 })}
						/>
						<span className="text-2xl font-semibold text-white md:text-3xl">Blog</span>
					</>
				) : (
					<span
						className={`block text-[calc(4rem_+_5vw)] tracking-wide leading-none text-center font-libre ${
							isSidebar ? 'text-[#19171a]' : 'text-[#19171a]'
						}`}
					>
						{publication.title}
					</span>
				)}
			</Link>
		</h1>
	);
};
