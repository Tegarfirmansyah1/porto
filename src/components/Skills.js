const skillsList = [
    { name: "Web Development", icon: "fas fa-code", color: "text-accent" },
    { name: "UI/UX Design", icon: "fas fa-palette", color: "text-info" },
    { name: "Frontend", icon: "fas fa-desktop", color: "text-secondary" },
    { name: "Database", icon: "fas fa-database", color: "text-success" },
];

export default function Skills() {
    return (
        <section id="skills" className="bg-bg py-20 scroll-mt-[88px]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-retro">My Skills</h2>
                <div className="grid grid-cols-2 gap-4 md:gap-8">
                    {skillsList.map((skill) => (
                        <div key={skill.name} className="bg-white rounded-xl shadow-lg p-4 md:p-6 text-center border-4 border-text hover:transform hover:scale-105 transition duration-300 hover:shadow-[8px_8px_0px_var(--retro-pink)] cursor-pointer">
                            <i className={`${skill.icon} text-3xl md:text-4xl ${skill.color} mb-2 md:mb-4`}></i>
                            <h3 className="font-semibold text-black text-sm md:text-lg font-retro">{skill.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}