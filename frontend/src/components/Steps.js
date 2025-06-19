function StepCard({ title, desc }) {
  return (
    <div className="p-4 border border-gray-700 rounded-lg shadow-sm bg-gray-800">
      <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-300">{desc}</p>
    </div>
  );
}

export default function Steps() {
  return (
    <section className="bg-gray-900 py-12 px-6 text-center text-white">
      <h2 className="text-2xl font-bold mb-6">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <StepCard
          title="1. Upload or Paste Text"
          desc="Add your content to our platform using a file upload or paste directly."
        />
        <StepCard
          title="2. Choose a Tool"
          desc="Select from grammar correction, paraphrasing, or summarization."
        />
        <StepCard
          title="3. Get Results Instantly"
          desc="Receive accurate, detailed feedback and make improvements with ease."
        />
      </div>
    </section>
  );
}
