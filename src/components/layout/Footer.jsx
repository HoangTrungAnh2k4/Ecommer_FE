function Footer() {
    return (
        <footer className="bg-background dark:bg-gray-900">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <span className="text-2xl font-semibold">Personal E-commerce Project</span>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">A non-commercial project built with:</p>
                        <ul className="mt-2 text-gray-600 dark:text-gray-400">
                            <li>• React.js</li>
                            <li>• Tailwind CSS</li>
                            <li>• Node.js</li>
                            <li>• MySql</li>
                        </ul>
                    </div>
                    <div className="grid grid-cols-2 gap-24 ">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold uppercase">Resources</h2>
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
                            <h2 className="mb-6 text-sm font-semibold uppercase">Contact</h2>
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
                <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8 dark:border-gray-700" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                        © 2024 Personal Project. All Rights Reserved.
                    </span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
