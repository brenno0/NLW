import {Link, useHistory} from 'react-router-dom';
import {FormEvent, useState} from 'react'

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';


import '../styles/auth.scss';
import { UseAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';


export function NewRoom(){

    const {user} = UseAuth();

    const [ newRoom,setNewRoom] = useState('');
    
    const history = useHistory()

    async function handleCreateRoom(event:FormEvent) {

        event.preventDefault();


        if(newRoom.trim()=== ''){
            return;
        }

        const roomRef = database.ref('rooms');


        const fireBaseRoom = await roomRef.push({

        title:newRoom,
        authorId:user?.id,
        });

        history.push(`/rooms/${fireBaseRoom.key}`)
        
        
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
                     <h2>Criar uma nova sala</h2>
                 <form onSubmit={handleCreateRoom}>
                     <input 
                     onChange={event=>setNewRoom(event.target.value)}
                     value={newRoom}
                     type="text" 
                     placeholder="Nome da sala"
                     />
                    <Button type="submit">
                         Criar  sala
                    </Button>
                 </form>
                 <p>
                    Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>

                 </p>
                 </div>
             </main>
         </div>
    
        );

}