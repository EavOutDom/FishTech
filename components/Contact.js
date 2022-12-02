import Button from "./Button";

const Contact = () => {
  return (<div className="py-24">
    <h2 className='text-center text-4xl font-bold'>Any questions? <span className="text-primary-500">Contact us.</span>
    </h2>
    <p className='text-center py-5 text-xl'>We are looking forward to hearing from you. Feel free to contact us
      if you have any questions!</p>
    <div className='flex justify-center'>
      <Button className="dark:bg-white dark:text-black bg-black text-white">Contact Us</Button>
    </div>
  </div>);
}

export default Contact;