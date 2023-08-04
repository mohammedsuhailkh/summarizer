
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
    
        if (articlesFromLocalStorage) {
          setallArticles(articlesFromLocalStorage);
        }
      }, []);





    

    const [getSummary, {error , isFetching}] = useLazyGetSummaryQuery();

   

    
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const {data} = await getSummary({articleUrl : article.url });
        if (data?.summary) {
            const newArticle = {...article, summary : data.summary};
            // update articles into the array
            const updateAllArticle = {newArticle, ...allArticles}
            setarticle(newArticle);
            setallArticles(updateAllArticle);

            console.log(newArticle.summary);

            localStorage.setItem('articles', JSON.stringify(updateAllArticle))
        }
        
    }
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

            <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
                 
            </div>
           
      </div>


        
        {/* Display Results */}
    </section>
  )
}

export default Demo
