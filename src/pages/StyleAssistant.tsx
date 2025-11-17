// Style Assistant Page - Color & Body Type Recommendations
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SideChat from '../components/SideChat';

interface ChatMessage {
  type: 'user' | 'bot';
  text: string;
}

const StyleAssistant = () => {
  const [activeTab, setActiveTab] = useState<'color' | 'bodytype'>('color');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { type: 'bot', text: 'Hi! I\'m your personal style assistant. 👋 I can help you find the perfect colors and styles for you!' }
  ]);
  const [selectedSkinTone, setSelectedSkinTone] = useState('');
  const [selectedBodyType, setSelectedBodyType] = useState('');
  const [showResults, setShowResults] = useState(false);

  // Color recommendations based on skin tone
  const colorRecommendations: { [key: string]: { colors: string[]; avoid: string[]; description: string; examples: string[] } } = {
    fair: {
      colors: ['Soft Pink', 'Lavender', 'Light Blue', 'Mint Green', 'Peach', 'Coral', 'Navy Blue', 'Burgundy'],
      avoid: ['Neon Colors', 'Very Dark Browns', 'Harsh Blacks'],
      description: 'Fair skin tones look stunning in soft, cool pastels and jewel tones.',
      examples: ['Pastel dresses', 'Navy blazers', 'Coral tops', 'Burgundy evening wear']
    },
    light: {
      colors: ['Rose', 'Teal', 'Emerald Green', 'Royal Blue', 'Dusty Pink', 'Warm Beige', 'Golden Yellow'],
      avoid: ['Very Pale Colors', 'Washed Out Grays'],
      description: 'Light skin tones shine in vibrant jewel tones and warm earthy colors.',
      examples: ['Emerald dresses', 'Rose pink suits', 'Royal blue sarees', 'Golden yellow kurtis']
    },
    medium: {
      colors: ['Rich Red', 'Olive Green', 'Burnt Orange', 'Deep Purple', 'Cobalt Blue', 'Hot Pink', 'Chocolate Brown'],
      avoid: ['Overly Pale Colors', 'Neon Green'],
      description: 'Medium skin tones can carry bold, rich colors beautifully.',
      examples: ['Red party wear', 'Olive green casual', 'Purple ethnic wear', 'Cobalt blue professional']
    },
    olive: {
      colors: ['Mustard Yellow', 'Forest Green', 'Rust', 'Crimson', 'Teal', 'Warm Browns', 'Deep Orange'],
      avoid: ['Pale Yellow', 'Light Pastels'],
      description: 'Olive skin tones look gorgeous in warm, earthy tones and deep colors.',
      examples: ['Mustard sarees', 'Forest green dresses', 'Crimson lehengas', 'Rust colored kurtis']
    },
    tan: {
      colors: ['Bright White', 'Electric Blue', 'Fuchsia', 'Turquoise', 'Gold', 'Tangerine', 'Deep Green'],
      avoid: ['Dull Colors', 'Muddy Browns'],
      description: 'Tan skin tones pop in bright, vibrant colors and metallics.',
      examples: ['White ethnic wear', 'Electric blue gowns', 'Gold sarees', 'Turquoise party wear']
    },
    deep: {
      colors: ['Bright Yellow', 'Hot Pink', 'Orange', 'Emerald', 'Ruby Red', 'Electric Blue', 'Pure White', 'Gold'],
      avoid: ['Dark Browns', 'Dull Grays', 'Black on Black'],
      description: 'Deep skin tones look stunning in bold, bright colors and metallics.',
      examples: ['Bright yellow suits', 'Hot pink lehengas', 'White sarees', 'Gold party wear']
    }
  };

  // Body type recommendations
  const bodyTypeRecommendations: { [key: string]: { description: string; best: string[]; styles: string[]; avoid: string[]; tips: string[] } } = {
    hourglass: {
      description: 'Balanced proportions with defined waist',
      best: ['Fitted dresses', 'Wrap dresses', 'Belted outfits', 'High-waisted bottoms', 'V-neck tops'],
      styles: ['Body-hugging sarees', 'Fitted lehengas', 'Wrap tops', 'Pencil skirts', 'Structured blazers'],
      avoid: ['Shapeless clothes', 'Too loose fits', 'Baggy styles'],
      tips: [
        'Emphasize your waist with belts',
        'Choose fitted silhouettes',
        'V-necklines elongate your figure',
        'Wrap dresses are perfect for you'
      ]
    },
    pear: {
      description: 'Smaller shoulders, fuller hips and thighs',
      best: ['A-line skirts', 'Boat neck tops', 'Embellished tops', 'Dark bottom wear', 'Flared pants'],
      styles: ['A-line lehengas', 'Anarkali suits', 'Palazzo pants', 'Off-shoulder tops', 'Flared skirts'],
      avoid: ['Tight bottoms', 'Horizontal stripes on bottom', 'Ankle-length tight pants'],
      tips: [
        'Draw attention to your upper body',
        'Use bright colors on top, darker on bottom',
        'A-line silhouettes balance proportions',
        'Statement necklaces work great'
      ]
    },
    apple: {
      description: 'Fuller midsection, slimmer legs',
      best: ['Empire waist dresses', 'V-neck tops', 'Long jackets', 'Straight-cut pants', 'Flowy tops'],
      styles: ['Anarkali suits', 'Long kurtis', 'Straight cut sarees', 'Flowy dresses', 'Long shrugs'],
      avoid: ['Tight waist bands', 'Clingy fabrics', 'Crop tops', 'High-waisted bottoms'],
      tips: [
        'Create vertical lines with long jackets',
        'V-necks draw eyes upward',
        'Show off your legs',
        'Empire waists are flattering'
      ]
    },
    rectangle: {
      description: 'Straight silhouette, balanced proportions',
      best: ['Peplum tops', 'Ruffled dresses', 'Layered outfits', 'Textured fabrics', 'Belted styles'],
      styles: ['Peplum kurtis', 'Ruffled sarees', 'Layered lehengas', 'Belted dresses', 'Textured suits'],
      avoid: ['Very straight cuts', 'Column dresses', 'Shapeless clothes'],
      tips: [
        'Create curves with ruffles and layers',
        'Add belts to define waist',
        'Peplum styles add dimension',
        'Experiment with textures'
      ]
    },
    inverted: {
      description: 'Broader shoulders, narrower hips',
      best: ['A-line dresses', 'Wide-leg pants', 'Detailed bottoms', 'V-neck tops', 'Darker tops'],
      styles: ['A-line lehengas', 'Flared pants', 'Detailed skirts', 'Palazzo sets', 'Bootcut pants'],
      avoid: ['Shoulder pads', 'Boat necks', 'Cap sleeves', 'Very tight bottoms'],
      tips: [
        'Balance with fuller bottoms',
        'Avoid adding volume to shoulders',
        'V-necks minimize upper body',
        'Draw attention to lower body'
      ]
    }
  };

  const handleSkinToneSelect = (tone: string) => {
    setSelectedSkinTone(tone);
    const userMsg: ChatMessage = { type: 'user', text: `I have ${tone} skin tone` };
    const recommendation = colorRecommendations[tone];
    const botMsg: ChatMessage = {
      type: 'bot',
      text: `Perfect! ${recommendation.description}\n\n✨ Best Colors for You:\n${recommendation.colors.join(', ')}\n\n❌ Colors to Avoid:\n${recommendation.avoid.join(', ')}\n\n💡 Style Suggestions:\n${recommendation.examples.join('\n')}`
    };
    setChatMessages([...chatMessages, userMsg, botMsg]);
    setShowResults(true);
  };

  const handleBodyTypeSelect = (bodyType: string) => {
    setSelectedBodyType(bodyType);
    const userMsg: ChatMessage = { type: 'user', text: `My body type is ${bodyType}` };
    const recommendation = bodyTypeRecommendations[bodyType];
    const botMsg: ChatMessage = {
      type: 'bot',
      text: `Great! ${recommendation.description}\n\n✨ Best Styles for You:\n${recommendation.best.join(', ')}\n\n👗 Recommended Outfits:\n${recommendation.styles.join(', ')}\n\n❌ Styles to Avoid:\n${recommendation.avoid.join(', ')}\n\n💡 Pro Tips:\n${recommendation.tips.join('\n')}`
    };
    setChatMessages([...chatMessages, userMsg, botMsg]);
    setShowResults(true);
  };

  const resetChat = () => {
    setChatMessages([
      { type: 'bot', text: 'Hi! I\'m your personal style assistant. 👋 I can help you find the perfect colors and styles for you!' }
    ]);
    setSelectedSkinTone('');
    setSelectedBodyType('');
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 pt-20">
      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Your Personal Style Assistant
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover colors that complement your skin tone and styles that flatter your body type
          </p>
        </div>
      </section>

        {/* Side chat widget (right-side floating) */}
        <SideChat />

      {/* Tab Selection */}
      <section className="px-4 mb-8">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-xl p-2 flex gap-2">
            <button
              onClick={() => { setActiveTab('color'); resetChat(); }}
              className={`flex-1 py-4 px-6 rounded-xl font-bold text-lg transition-all ${
                activeTab === 'color'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              🎨 Color Analysis
            </button>
            <button
              onClick={() => { setActiveTab('bodytype'); resetChat(); }}
              className={`flex-1 py-4 px-6 rounded-xl font-bold text-lg transition-all ${
                activeTab === 'bodytype'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              👗 Body Type Guide
            </button>
          </div>
        </div>
      </section>

      {/* Chat Interface */}
      <section className="px-4 pb-20">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50 to-white">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl ${
                      msg.type === 'user'
                        ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                        : 'bg-white shadow-md text-gray-800 border-2 border-pink-200'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Selection Options */}
            <div className="p-6 bg-white border-t-2 border-gray-100">
              {activeTab === 'color' && !showResults && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Select Your Skin Tone:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {Object.keys(colorRecommendations).map((tone) => (
                      <button
                        key={tone}
                        onClick={() => handleSkinToneSelect(tone)}
                        className="p-4 bg-gradient-to-br from-pink-100 to-purple-100 hover:from-pink-200 hover:to-purple-200 rounded-xl font-semibold text-gray-800 capitalize transition-all transform hover:scale-105 shadow-md hover:shadow-xl"
                      >
                        {tone} Skin
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'bodytype' && !showResults && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Select Your Body Type:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {Object.keys(bodyTypeRecommendations).map((type) => (
                      <button
                        key={type}
                        onClick={() => handleBodyTypeSelect(type)}
                        className="p-4 bg-gradient-to-br from-pink-100 to-purple-100 hover:from-pink-200 hover:to-purple-200 rounded-xl font-semibold text-gray-800 capitalize transition-all transform hover:scale-105 shadow-md hover:shadow-xl"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                  
                  {/* Body Type Guide */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl">
                    <p className="text-sm text-gray-600 mb-2 font-semibold">Need help identifying your body type?</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>⏳ <strong>Hourglass:</strong> Bust & hips similar, defined waist</li>
                      <li>🍐 <strong>Pear:</strong> Hips wider than shoulders</li>
                      <li>🍎 <strong>Apple:</strong> Fuller midsection, slimmer legs</li>
                      <li>📏 <strong>Rectangle:</strong> Shoulders, waist & hips similar width</li>
                      <li>🔺 <strong>Inverted Triangle:</strong> Shoulders wider than hips</li>
                    </ul>
                  </div>
                </div>
              )}

              {showResults && (
                <div className="text-center">
                  <button
                    onClick={resetChat}
                    className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-bold text-lg hover:shadow-xl transition-all transform hover:scale-105"
                  >
                    Start New Analysis
                  </button>
                  <Link to="/party-wear">
                    <button className="ml-4 px-8 py-4 bg-gray-900 text-white rounded-full font-bold text-lg hover:bg-primary transition-all transform hover:scale-105">
                      Shop Now
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Educational Section */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Why Personal Styling Matters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-xl font-bold mb-2">Enhance Your Beauty</h3>
              <p className="text-gray-600">The right colors can make your skin glow and your features pop</p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">💃</div>
              <h3 className="text-xl font-bold mb-2">Boost Confidence</h3>
              <p className="text-gray-600">Clothes that fit your body type make you feel amazing</p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🛍️</div>
              <h3 className="text-xl font-bold mb-2">Shop Smarter</h3>
              <p className="text-gray-600">Make informed choices and build a wardrobe that works for you</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StyleAssistant;
