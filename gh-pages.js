import { publish } from 'gh-pages';

publish(
	'build', // path to public directory
	{
		branch: 'gh-pages',
		repo: 'https://github.com/PickleNik/CootsPong.git', // Update to point to your repository
		user: {
			name: 'Nikita Krupin', // update to use your name
			email: 'krupin.nikita0110@gmail.com' // Update to use your email
		},
		dotfiles: true
	},
	() => {
		console.log('Deploy Complete!');
	}
);
