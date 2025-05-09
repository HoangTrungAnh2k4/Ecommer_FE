function Footer() {
    return (
        <footer className="bg-background dark:bg-gray-900">
            <div className="mx-auto p-4 py-6 lg:py-8 w-full max-w-screen-xl">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <span className="font-semibold text-2xl">Personal E-commerce Project</span>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">A non-commercial project built with:</p>
                        <ul className="mt-2 text-gray-600 dark:text-gray-400">
                            <li>• React.js</li>
                            <li>• Tailwind CSS</li>
                            <li>• Node.js</li>
                            <li>• MongoDB</li>
                        </ul>
                    </div>
                    <div className="gap-24 grid grid-cols-2">
                        <div>
                            <h2 className="mb-6 font-semibold text-sm uppercase">Resources</h2>
                            <ul className="text-gray-600 dark:text-gray-400">
                                <li className="mb-4">
                                    <a href="https://react.dev" className="hover:underline">
                                        React
                                    </a>
                                </li>
                                <li>
                                    <a href="https://tailwindcss.com" className="hover:underline">
                                        Tailwind CSS
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 font-semibold text-sm uppercase">Contact</h2>
                            <ul className="text-gray-600 dark:text-gray-400">
                                <li className="mb-4">
                                    <a href="https://github.com" className="hover:underline">
                                        Github
                                    </a>
                                </li>
                                <li>
                                    <a href="mailto:example@email.com" className="hover:underline">
                                        Email
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="sm:mx-auto my-6 lg:my-8 border-gray-200 dark:border-gray-700" />
                <div className="sm:flex sm:justify-between sm:items-center">
                    <span className="text-gray-500 dark:text-gray-400 text-sm sm:text-center">
                        © 2024 Personal Project. All Rights Reserved.
                    </span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
