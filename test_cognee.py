import asyncio
import os
from dotenv import load_dotenv

load_dotenv()

import cognee

async def main():
    print("🧠 Testing Cognee + Groq...")
    
    # Reset for clean test
    await cognee.prune.prune_data()
    await cognee.prune.prune_system(metadata=True)
    
    # 1. REMEMBER
    print("📝 Remembering facts...")
    await cognee.add("Manisha is a B.Tech AI/ML student at LPU with 9.67 CGPA.")
    await cognee.add("Manisha built BizAgent AI for the AMD Hackathon 2026.")
    await cognee.add("Manisha is participating in the WeMakeDevs Cognee hackathon.")
    await cognee.cognify()
    
    # 2. RECALL
    print("🔍 Recalling facts...")
    results = await cognee.search("What hackathons is Manisha participating in?")
    print("\n✅ Results:")
    for r in results:
        print("-", r)

    print("\n🎉 Cognee + Groq working!")

asyncio.run(main())