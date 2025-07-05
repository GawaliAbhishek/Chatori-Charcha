import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import chatIcon from '../assets/chat.png';
import { getRooms } from '../services/RoomService';
import toast from 'react-hot-toast';

const RoomList = () => {
    const [rooms, setRooms] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const loadRooms = async () => {
            try {
                const response = await getRooms();
                const sortedRooms = [...response].reverse();
                setRooms(sortedRooms);
                console.log(sortedRooms);
            } catch (error) {
                console.log(error);
                toast.error("Server Side Error");
            }
        };
        loadRooms();
    }, []);

    const filteredRooms = rooms.filter(room =>
        room.roomId.toLowerCase().startsWith(searchTerm.toLowerCase())
    );

    // 👇 Handle Join Room Click
    const handleJoinRoom = async (roomId) => {
        try {
            await navigator.clipboard.writeText(roomId);
            toast.success("Room ID copied to clipboard!");
            setTimeout(() => {
                navigate(`/`); // Replace with your target route
            }, 2000); // 2 seconds delay
        } catch (err) {
            toast.error("Failed to copy Room ID");
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-10">
            <div className="p-8 dark:border-gray-700 border w-full max-w-4xl rounded dark:bg-gray-900 shadow flex flex-col gap-6">
                <div className="flex justify-center">
                    <img src={chatIcon} className="w-20" alt="Chat Logo" />
                </div>
                <h1 className="text-3xl font-bold text-center">Available Groups</h1>
                <p className="text-center text-gray-700 dark:text-gray-300">
                    Jump into a group and start your bakbak session now! 😄 Whether you’re in the mood for memes, music, or motivation – there’s a group waiting for you!
                </p>

                <input
                    type="text"
                    placeholder="Search Room ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none"
                />

                <div className="overflow-y-auto max-h-64 border dark:border-gray-700 rounded">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="sticky top-0 bg-gray-100 dark:bg-gray-800 z-10">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">#</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Room ID</th>
                                <th className="px-6 py-3"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredRooms.length > 0 ? (
                                filteredRooms.map((room, index) => (
                                    <tr key={room.roomId}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                            {room.roomId}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                                            <button
                                                onClick={() => handleJoinRoom(room.roomId)}
                                                className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow"
                                            >
                                                Copy Room Id
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center py-4 text-gray-500 dark:text-gray-400">
                                        No rooms found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default RoomList;
