import fetch from 'node-fetch'

let handler = async (m, { text }) => {
    if (!text) throw 'Imput Query?'
    let res = await fetch(global.API('https://api.github.com', '/search/repositories', {
        q: text
    }))
    let json = await res.json()
    if (res.status !== 200) throw json
    let str = json.items.map((repo, index) => {
        return `
${1 + index}. *${repo.full_name}*${repo.fork ? ' (fork)' : ''}
${repo.html_url}
🛠️CreatedAt: *${formatDate(repo.created_at)}*
⏳Last update: *${formatDate(repo.updated_at)}*
👀viewer:  ${repo.watchers}
🔌fork:  ${repo.forks}
⭐star: ${repo.stargazers_count}
📝Issue: ${repo.open_issues}
${repo.description ? `
*Deskripsi:*\n${repo.description}` : ''}
🖇️Url: ${repo.clone_url}
`.trim()
    }).join('\n\n')
   m.reply(str)
}
handler.help = ['githubsearch'].map(v => v + ' <query>')
handler.tags = ['tools','internet']
handler.command = /^(g(it)?h(ub)?s(earch)?)$/i
export default handler

function formatDate(n, locale = 'id') {
    let d = new Date(n)
    return d.toLocaleDateString(locale, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
  }