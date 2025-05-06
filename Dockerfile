FROM oven/bun:1

RUN mkdir -p /usr/src/app && chown -R bun:bun /usr/src/app

WORKDIR /usr/src/app

COPY package.json bun.lockb ./

USER bun

RUN bun install --frozen-lockfile

COPY --chown=bun:bun . .

EXPOSE 3000

CMD ["bun", "run", "start"]