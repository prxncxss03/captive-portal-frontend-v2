import {AiFillWindows,AiFillAndroid,AiFillApple,} from 'react-icons/ai';
import {DiLinux} from 'react-icons/di';

export const osdata= [
    {
        id: 1,
        icon: <AiFillWindows size={22}/>,
        name: "Windows",
        count: 1,

    },
    {
        id: 2,
        icon: <AiFillApple size={22}/>,
        name: "Mac",
        count: 4,

    },
    {
        id: 3,
        icon: <AiFillAndroid size={22}/>,
        name: "Android",
        count: 40,
    },
    {
        id: 4,
        icon: <DiLinux size={22}/>,
        name: "Linux",
        count: 20,
    }


]