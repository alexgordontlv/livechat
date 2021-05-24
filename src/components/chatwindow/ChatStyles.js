import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
	root: {
		maxWidth: 500,
		maxHeight: 600,
		minHeight: 600,
	},
	header: {
		display: 'flex',
		justifyContent: 'space-between',
		backgroundColor: 'grey',
	},
	inline: {
		display: 'inline',
	},
	chatWindow: {
		maxHeight: 500,
		minHeight: 500,
	},
});
