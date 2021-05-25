import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
	list: {
		width: '100%',
		maxWidth: '36ch',
		backgroundColor: 'red',
		overflow: 'auto',
	},
	header: {
		display: 'flex',
		justifyContent: 'space-between',
		backgroundColor: 'grey',
	},
	body: {
		display: 'flex',
		justifyContent: 'space-between',
		backgroundColor: 'green',
		height: '60vh',
	},
	input: {
		backgroundColor: 'green',
	},
	footer: {
		display: 'flex',
		justifyContent: 'space-between',
		borderTop: '1px solid black',
	},
});
