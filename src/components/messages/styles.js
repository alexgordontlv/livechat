import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
	list: {
		width: '100%',
		maxWidth: '36ch',
		overflow: 'auto',
	},
	header: {
		display: 'flex',
		justifyContent: 'space-between',
		backgroundColor: 'grey',
		height: '50px',
	},
	body: {
		display: 'flex',
		justifyContent: 'space-between',
		height: '400px',
	},

	footer: {
		display: 'flex',
		justifyContent: 'space-between',
		borderTop: '1px solid black',
	},
});
