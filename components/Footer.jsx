import { Twitter } from 'lucide-react';
import { Github } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className=" text-gray-300 p-6 mt-10 border-t-1 border-opacity-95">
      <div className="container mx-auto text-center">
        <h2 className="text-xl font-bold text-white">CODESHARD</h2>
        <p className="text-sm my-4">Collaborative Code Editor for Seamless Real-Time Coding</p>
        
        {/* Social Links */}
        <div className="flex justify-center gap-6 my-4">
          <Link href="https://x.com/code_shard">
            <Twitter  className="h-6 w-6 text-white hover:text-blue-500" />
          </Link>
          <Link href="https://github.com/MridulDhiman/code-shard">
            <Github  className="h-6 w-6 text-white hover:text-gray-500" />
          </Link>
        </div>
        
        {/* Terms & Conditions / Privacy Policy Links */}
        <div className="my-6">
          <Link href="/terms" className="text-sm text-gray-400 hover:text-gray-200 mx-4">
            Terms & Conditions
          </Link>
          <Link href="/privacy-policy" className="text-sm text-gray-400 hover:text-gray-200 mx-4">
            Privacy Policy
          </Link>
        </div>

        {/* Copyright Notice */}
        <p className="text-sm mt-6 text-gray-400">
          &copy; 2024 CodeShard. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
