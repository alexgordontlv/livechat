import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
	list: {
		width: '100%',
		maxWidth: '36ch',
		backgroundColor: 'white',
	},
	header: {
		display: 'flex',
		justifyContent: 'space-between',
		backgroundColor: 'grey',
	},
	body: {
		display: 'flex',
		justifyContent: 'space-between',
		height: '70vh',
	},
});
