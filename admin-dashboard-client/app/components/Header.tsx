import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="font-semibold text-xl">Welcome to MEL Laundry Admin</div>
      <div className="flex space-x-4 items-center">
        <Image
          src="/profile-icon.png"
          alt="Profile"
          width={30}
          height={30}
          className="rounded-full"
        />
      </div>
    </header>
  );
}
