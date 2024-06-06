import React from 'react';
import axios from 'axios';

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
        <div className='text-slate-900'>
            <label>URL</label>
            <input className='border border-slate-500' onChange={(r) => setUrl(r.target.value)} type="text" />
            <br />
            <label>IMG URL</label>
            <input className='border border-slate-500' type="text" onChange={(r) => setImgUrl(r.target.value)} />
            <button onClick={handleGenerate}>Generate</button>
            {src && <img className='w-20 h-20' src={src} />}
        </div>
    );
};
