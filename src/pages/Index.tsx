import { useEffect, useState } from "react";

const Index = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg">
      <div className={`text-center p-8 ${loaded ? 'animate-fade-in' : 'opacity-0'}`}>
        <h1 className="text-6xl font-bold mb-6 text-hello-primary">
          Hello!
        </h1>
        <p className="text-xl text-gray-600 max-w-md mx-auto">
          Welcome to this simple page. We're glad you're here.
        </p>
      </div>
    </div>
  );
};

export default Index;