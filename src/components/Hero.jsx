import {logo} from '../assets'

const Hero = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
        <nav className='flex justify-between items-center w-full mb-10 pt-3'>
            <img src={logo} alt="logo" className='w-28 object-contain' />
            <button type='button' onClick={()=>window.open('https://github.com/mohammedsuhailkh')} className='black_btn'>Github</button>

        </nav>
        <h1 className='head_text'>
            Summarize Articles With <br className='max-md:hidden'/>
            <span className='orange_gradient'>OpenAi GPT-4</span>
        </h1>
        <h2 className="desc">Welcome to ShortnIt, the ultimate article shortening web app designed to make your reading experience more efficient and enjoyable. Whether you're a student, a professional, or simply someone who loves to read, ShortenIt is here to transform lengthy articles into concise and easily digestible content, without compromising the essence and essential information.</h2>
    </header>
  )
}

export default Hero
