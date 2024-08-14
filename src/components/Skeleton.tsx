export default function Skeleton() {
  return (
    <div className="mt-14 text-center ">
      <div className="text-2xl sm:text-4xl text-purple-400 font-bold">
        Time to plan your day
      </div>
      <div>
        <iframe
          className="size-80 mx-auto"
          src="https://giphy.com/embed/BpGWitbFZflfSUYuZ9"
          width="100%"
          height="100%"
          allowFullScreen
        ></iframe>
      </div>
      <div className="text-2xl sm:text-4xl text-purple-400 italic">
        Add some tasks to track them
      </div>
    </div>
  );
}
