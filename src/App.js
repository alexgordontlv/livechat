import Chat from './components/chat/Chat';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
	return (
		<Router>
			<div className='App'>
				<Chat />
			</div>
		</Router>
	);
}

export default App;
