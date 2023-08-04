
import { useEffect, useState } from "react"
import { copy, linkIcon,tick,loader } from "../assets"
import { useLazyGetSummaryQuery } from "../services/article";
const Demo = () => {
    
    const [article, setarticle] = useState(
        {
            url : "",
            summary : "",
        }
    );
   

    // storing the articles into the local storage
    const [allArticles, setallArticles] = useState([]);
    useEffect(() => {
      const articlesFromLocalStorage = JSON.parse(
        localStorage.getItem("articles")
      );
    
      if (Array.isArray(articlesFromLocalStorage)) { // Check if it's an array
        setallArticles(articlesFromLocalStorage);
      }
    }, []);
    





    

    const [getSummary, {error , isFetching}] = useLazyGetSummaryQuery();
    const [copied, setCopied] = useState("");

   

    
    const handleSubmit = async(e)=>{
        e.preventDefault();
        
        const {data} = await getSummary({articleUrl : article.url });
        if (data?.summary) {
            const newArticle = {...article, summary : data.summary};
            // update articles into the array
            const updateAllArticle = [newArticle, ...allArticles]
            
            setarticle(newArticle);
            setallArticles(updateAllArticle);

            

            localStorage.setItem('articles', JSON.stringify(updateAllArticle))
        }
        
    }
    const handleCopy = (copyUrl) => {
      setCopied(copyUrl);
      navigator.clipboard.writeText(copyUrl);
      setTimeout(() => setCopied(false), 3000);
    };

  return (
    <section className="mt-16 w-full max-w-xl">
        <div className="flex flex-col w-full gap-2">
            <form className="relative flex justify-center items-center" onSubmit={handleSubmit}>
                <img src={linkIcon} alt="linkIcon" className="absolute left-0 my-2 ml-3 w-5" />
                <input required type="url" placeholder="Enter a URL" value={article.url} onChange={(e)=>{setarticle({...article, url: e.target.value})}} className="url_input peer" />
                <button type="submit" className="submit_btn btnHover peer-focus:border-gray-700
                peer-focus:text-gray-700">↲</button>
            </form>

            {/* Browser History */}

            <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
          {allArticles.map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setarticle(item)}
              className='link_card'
            >
              <div className='copy_btn' onClick={() => handleCopy(item.url)}>
                <img
                  src={copied === item.url ? tick : copy}
                  alt={copied === item.url ? "tick_icon" : "copy_icon"}
                  className='w-[40%] h-[40%] object-contain'
                />
              </div>
              <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>

        
        {/* Display Results */}
        <div className="my-10 max-w-full justify-center items-center flex">
          {isFetching ? (<img src={loader} alt="loader"  className="w-20 h-20 object-contain"/>)
           : error ? (<p className="font-bold font-inter text-black text-center">well..Somethings Wrong  <br/>
            <span className="font-satoshi font-normal text-gray-700">{error?.data?.error}</span> </p> ) 
            : (article.summary &&  ( 
            <div className="flex flex-col gap-3"><h2 className="font-satoshi font-bold text-gray-600 text-xl">Article <span className="blue_gradient">Summary</span></h2>
             <div className="summary_box"><p className="font-inter font-medium text-sm text-gray-700">{article.summary}</p></div> </div>))}
        </div>
    </section>
  )
}

export default Demo
