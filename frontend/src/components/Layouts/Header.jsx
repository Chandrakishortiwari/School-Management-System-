const Header = ({setOpen})=> {
  return (
    <div className="h-16 bg-white border-b flex items-center justify-between px-6">
      
      {/* Search */}
         <button onClick={() => setOpen(true)} className=" md:hidden block bg-white p-2 rounded">☰</button>
         <h1 className="font-semibold">School Name</h1>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <button>🔔</button>

        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">
          J
        </div>
      </div>
    </div>
  );
}

export default Header;