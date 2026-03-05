#!/usr/bin/env python3
import re,sys,os
p = "index.html"
if not os.path.exists(p):
    print("index.html not found"); sys.exit(1)
s = open(p, "r", encoding="utf-8", errors="ignore").read()

# Tokenize into tags and text
tokens = re.split(r'(<[^>]+>)', s)

voids = set(["area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"])
stack = []
out = []
removed = 0

tagname_re = re.compile(r'<\s*(/)?\s*([a-z0-9:-]+)', re.I)

for t in tokens:
    if not t:
        continue
    if t.startswith('<'):
        m = tagname_re.match(t)
        if not m:
            out.append(t); continue
        closing = bool(m.group(1))
        tag = m.group(2).lower()
        # treat self-closing tags as void
        is_void = (tag in voids) or t.strip().endswith('/>')
        if is_void:
            out.append(t)
            continue
        if not closing:
            # opening tag
            stack.append(tag)
            out.append(t)
        else:
            # closing tag
            if stack and stack[-1] == tag:
                stack.pop()
                out.append(t)
            else:
                # unmatched closing tag
                if tag == "div":
                    # skip (remove) unmatched closing div
                    removed += 1
                    # do not append t
                else:
                    # keep other unmatched closing tags (safer)
                    out.append(t)
# If removals happened, write fixed file
if removed == 0:
    print("No unmatched </div> found. Nothing changed.")
else:
    fixed = "".join(out)
    open(p, "w", encoding="utf-8").write(fixed)
    print(f"Removed {removed} unmatched </div> tags and wrote {p}")
