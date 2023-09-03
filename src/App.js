import { useState, useEffect } from 'react';
import axios from 'axios';
import parse from 'html-react-parser';

export default function Example() {
  const [isLoading, setLoading] = useState(true);
  const [quotes, setQuotes] = useState();
  const [autoFetch, setAutoFetch] = useState(false);
  const [isShown, setIsShown] = useState(false);

  // const config = {
  //   headers: {
  //     'x-api-key': 'SqD712P3E82xnwOAEOkGd5JZH8s9wRR24TqNFzjk',
  //     'Content-Type': 'application/x-www-form-urlecoded',
  //   },
  // };

  const getQuotes = async () => {
    setIsShown(true);
    await axios.get('http://api.quotable.io/random')
      .then(res => {
        const quotesText = res.data.content+'<br/> - '+res.data.author+' -';
        setQuotes(parse(quotesText));
        setLoading(false);
        setIsShown(false);
      })
      .catch(err => {
        setLoading(false);
        setIsShown(false);
      });
  }
  const shareFacebook = () => {
    alert("You called me!!! In Sha ALLAH, I'll develop this functionality later");
  }
  const getAutoFetch = () => {
    setAutoFetch(!autoFetch);
  }

  useEffect(() => {
    getQuotes();
  },[]);

  useEffect(() => {
    let intervalId;
    if (autoFetch) {
      intervalId = setInterval(() => {
        getQuotes();
      }, 60000);
      return () => clearInterval(intervalId);
    }
  },[autoFetch]);

  if (isLoading) {
    return (
      <div class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
        <div class="animate-pulse flex space-x-4">
          <div class="rounded-full bg-slate-200 h-10 w-10"></div>
          <div class="flex-1 space-y-6 py-1">
            <div class="h-2 bg-slate-200 rounded"></div>
            <div class="space-y-3">
              <div class="grid grid-cols-3 gap-4">
                <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                <div class="h-2 bg-slate-200 rounded col-span-1"></div>
              </div>
              <div class="h-2 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="min-h-full flex flex-auto h-screen bg-hero-pattern align-middle">
        <div class="w-full h-2/3 m-auto ml-8 mr-8 p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <h5 class="mb-2 text-3xl font-bold text-blue-900 dark:text-white">Random Quotes</h5>
          <p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">{quotes}</p>

          <div class="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
            <span type="button" class="absolute cursor-pointer bottom-32 px-3 py-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
              <label className='cursor-pointer'>
                <input
                  type="checkbox"
                  checked={autoFetch}
                  onChange={() => {getAutoFetch()}}
                />
                <span className='pl-2'>Fetch every 1 minute</span>
              </label>
            </span>
            <button type="button" onClick={() => shareFacebook()} class="absolute left-16 bottom-32 px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg viewBox="0 0 12 12" width="18" fill='white' preserveAspectRatio="xMidYMid meet">
                <path class="svg-icon-path" d="M9.1,0.1V2H8C7.6,2,7.3,2.1,7.1,2.3C7,2.4,6.9,2.7,6.9,3v1.4H9L8.8,6.5H6.9V12H4.7V6.5H2.9V4.4h1.8V2.8 c0-0.9,0.3-1.6,0.7-2.1C6,0.2,6.6,0,7.5,0C8.2,0,8.7,0,9.1,0.1z"></path>
              </svg>
              <span>Share</span>
            </button>
            {!isShown && (
            <button type="button" onClick={() => getQuotes()} class="absolute right-16 bottom-32 px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search mr-2" viewBox="0 0 16 16" id="IconChangeColor"> <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" id="mainIconPathAttribute"></path> </svg>
              Find Quotes
            </button>
            )}
            {isShown && (
            <button type="button" class="load-quote absolute right-16 bottom-32 px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
              </svg>
              Loading...
            </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
