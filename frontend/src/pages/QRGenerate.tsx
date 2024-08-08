import React from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const QRGenerate = () => {
    const [url, setUrl] = React.useState('');
    const [imgUrl, setImgUrl] = React.useState('');
    const [src, setSrc] = React.useState('');

    React.useEffect(() => {
        console.log(url, imgUrl);
    }, [url, imgUrl]);

    function handleGenerate() {
        const data = {
            url: url,
            img_url: imgUrl
        };

        axios.post('http://localhost:8000/generate/', data)
            .then(response => {
                console.log(response.data);
                const result =  response.data;
                setSrc(`data:image/png;base64,${result.qr_image_base64}`);
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div className='flex flex-col gap-2 w-full h-full items-center justify-center '>
            <h1 className='text-4xl px-4 py-8 font-extrabold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text'>QR Code Generator</h1>
            <br/>
            <div className='flex border rounded-lg p-4 flex-col w-full max-w-[500px] gap-1'>
            <label className='text-sm italic font-extrabold'>URL</label>
            <Input className='border border-slate-500' onChange={(r) => setUrl(r.target.value)} type="text" />
            
            <label className='text-sm italic font-extrabold'>IMG URL</label>
            <Input className='border border-slate-500' type="text" onChange={(r) => setImgUrl(r.target.value)} />
            <Button onClick={handleGenerate}>Generate</Button>
            </div>
            <div className='w-full  aspect-square md:w-[500px] flex items-center justify-center border-2 border-dashed rounded-lg'>
            {!src && <h1 className=" text-center justify-center font-bold text-gray-500 text-lg">Result</h1>}
            {src && <img className='w-20 h-20' src={src} />}
            </div>
        </div>
    );
};
