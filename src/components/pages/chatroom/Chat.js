import React, { useRef, useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase'; // Ensure these are correctly imported
import SendMessage from './SendMessage';
import SignOut from './SignOut';

function Chat() {
    const [messages, setMessages] = useState([]); // State to store chat messages
    const scroll = useRef(); // Ref for auto-scrolling to the latest message

    useEffect(() => {
        // Query to fetch messages ordered by timestamp
        const q = query(collection(db, 'messages'), orderBy('date', 'asc'));

        // Real-time listener for Firestore updates
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedMessages = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setMessages(fetchedMessages);
        });

        // Cleanup listener on unmount
        return () => unsubscribe();
    }, []);

    return (
        <div>
            <SignOut />
            <div className="msgs">
                {messages.map(({ id, text, uid }) => (
                    <div key={id} className={`msg ${uid === auth.currentUser?.uid ? 'sent' : 'received'}`}>
                        <p>{text}</p>
                    </div>
                ))}
            </div>
            <SendMessage scroll={scroll} />
            <div ref={scroll}></div>
        </div>
    );
}

export default Chat;
