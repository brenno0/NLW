import {useHistory} from 'react-router-dom';



import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';


import '../styles/auth.scss';
import { UseAuth } from '../hooks/useAuth';
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';





export const Home = ()=>{
    const history = useHistory();
    const {signInWithGoogle,user } = UseAuth();
    const [roomCode,setRoomCode] = useState('');

 const  handleCreateRoom = async ()=>{
    if(!user){
        await signInWithGoogle();
    }

  

    history.push('/rooms/new')

    
 }   


 async function handleJoinRom(event:FormEvent){
    event.preventDefault();


    if(roomCode.trim() === ''){
        return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if(!roomRef.exists()){
        alert('Room Does not exists.')
        return;
    }

    if(roomRef.val().endedAt){
        alert('Room already closed.');
        return;
    }

    history.push(`/rooms/${roomCode}`)

 }
    
    return(

     <div id="page-auth">
         <aside>
            <img src={illustrationImg} alt="Ilustração simbolizando peguntas e respostas" />
            <strong>Crie salas de Q&amp;A ao-vivo</strong>
            <p>Tire as dúvidas da sua audiencia em tempo-real</p>
         </aside>
         <main>
             <div className="main-content">
             <img src={logoImg} alt="Letmeask" />
             <button onClick={handleCreateRoom} className="create-room">
                <img src={googleIconImg} alt="Logo do Google" />
                 Crie sua sala com o Google
             </button>
             <div className="separator">ou entre em uma sala</div>
             <form onSubmit={handleJoinRom}>
                 <input 
                 onChange={event => setRoomCode(event.target.value)}
                 value={roomCode}
                 type="text" 
                 placeholder="Digite o código da sala"
                 />
                <Button type="submit">
                     Entrar na sala
                </Button>
             </form>
             </div>
         </main>
     </div>

    );


}