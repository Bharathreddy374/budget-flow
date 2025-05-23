import React, { useRef ,useState} from 'react'
import{LuUser,LuUpload,LuTrash} from 'react-icons/lu';

const ProfilePicSelector = ({image,setimage}) => {
    const inputRef=useRef(null);
    const [prevurl,setprevurl]=useState(null);
   const handleimgChange=(event)=>{
    const file=event.target.files[0];
    if(file){
        setimage(file);
        const preview=URL.createObjectURL(file);
        setprevurl(preview);
    }
   };
   const handleRemoveImage=()=>{
    setimage(null);
    setprevurl(null);
   };
   const onChooseFile=()=>{
    inputRef.current.click();

   };

  return (
    <div className='flex justify-center mb-6'>
        <input type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleimgChange} 
        className='hidden'
        />
        {!image ?(
            <div className="w-25 h-25 flex items-center justify-center bg-purple-100 rounded-full relative">
                <LuUser className='text-4xl text-primary'/>
                <button
                type='button'
                className='w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1'
                onClick={onChooseFile}
                >
                    <LuUpload/>
                </button>
            </div>
        ):(
            <div className="relative">
                <img src={prevurl} alt="profile pic" 
                className='w-25 h-25 rounded-full object-cover'
                />
                <button
                type='button'
                className='w-8 h-8 flex items-center justify-center bg-red-600 text-white rounded-full absolute -bottom-1 -right-1'
                onClick={handleRemoveImage}
                >
                    <LuTrash/>
                </button>
            </div>
        )}

    </div>
  )
}

export default ProfilePicSelector